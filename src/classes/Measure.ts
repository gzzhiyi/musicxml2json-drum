import { has, isArray, isEmpty } from 'lodash'
import { noteTypeToNumber } from '@/utils'
import NoteClass from '@/classes/Note'
import {
  MeasureXML,
  Metronome,
  Note,
  NoteXML,
  Time,
  TimeSignature
} from '@/types'

type PropsType = {
  id: string
  isLast: boolean
  metronome: Metronome
  partId: string
  speed: number
  startTime: number
  timeSignature: TimeSignature
  xmlData: MeasureXML
}

export default class Measure {
  public id: string
  public isLast: boolean
  public metronome: Metronome
  public notes: Note[]
  public number: string
  public partId: string
  public time: Time | null = null
  public timeSignature: TimeSignature

  private speed: number
  private startTime: number

  constructor({
    id,
    isLast,
    metronome,
    partId,
    speed,
    startTime,
    timeSignature,
    xmlData
  }: PropsType) {
    // Props
    this.id = id
    this.isLast = isLast
    this.metronome = metronome
    this.partId = partId
    this.timeSignature = timeSignature

    this.number = this.getNumber(xmlData)
    this.notes = this.getNotes(xmlData)

    this.startTime = startTime
    this.speed = speed || 1
  }

  private getNotes(measureXML: MeasureXML): Note[] {
    const notesList: NoteClass[] = []
    let count = 1

    if (isEmpty(measureXML?.note)) { // 如果小节音符为空，自动补全音符
      const noteClass = new NoteClass({
        id: `N_${this.number}_${count}`,
        measureId: this.id
      })

      this.addNoteToList(noteClass, notesList)
      return notesList
    }

    const notesXML = isArray(measureXML.note) ? measureXML.note : [measureXML.note]
    notesXML.forEach((noteXML) => {
      if (this.isChord(noteXML)) {
        const lastNote = notesList[notesList.length - 1]
        lastNote.kind = 'chord'
        const data = lastNote.getData(noteXML)
        data && lastNote.appendData(data)
      } else {
        const noteClass = new NoteClass({
          id: `N_${this.number}_${count}`,
          measureId: this.id,
          xmlData: noteXML
        })

        const data = noteClass.getData(noteXML)
        data && noteClass.appendData(data)

        this.addNoteToList(noteClass, notesList)
        count++
      }
    })

    return notesList
  }

  private addNoteToList(noteClass: NoteClass, notesList: NoteClass[]) {
    const startTime = this.time?.start || this.startTime
    const duration = this.calNoteDuration(noteClass)

    this.time = {
      start: startTime + duration,
      duration: (this.time?.duration || 0) + duration,
      end: startTime + duration
    }

    noteClass.appendTime(startTime, duration)
    notesList.push(noteClass)
  }

  private getNumber(measureXML: MeasureXML): string {
    return measureXML._number || ''
  }

  private isChord(noteXML: NoteXML): boolean {
    return has(noteXML, 'chord')
  }

  private calNoteDuration(note: Note): number {
    const { kind, type, timeModification, notations, dot } = note

    if (!type) {
      return 0
    }

    const { beatUnit, bpm } = this.metronome
    const { beats, beatType } = this.timeSignature

    const beatTime = Math.floor(60 / bpm / (beatType / beatUnit) * 1000)
    let duration = kind === 'rest' && type === 'whole' ? beatTime * beats : (beatType / noteTypeToNumber(type)) * beatTime

    if (!isEmpty(timeModification)) {
      const { tuplet } = notations
      const { actualNotes, normalNotes } = timeModification
      const radix = tuplet === 'stop' ? (Math.floor(100 / actualNotes) + (100 % actualNotes)) / 100 : Math.floor(100 / actualNotes) / 100

      duration = Math.floor(duration * normalNotes * radix)
    }

    if (dot === 'single') {
      duration = Math.floor(duration * 1.5)
    } else if (dot === 'double') {
      duration = Math.floor(duration * 1.75)
    } else if (dot === 'triple') {
      duration = Math.floor(duration * 1.875)
    }

    return Math.round(duration / this.speed)
  }
}
