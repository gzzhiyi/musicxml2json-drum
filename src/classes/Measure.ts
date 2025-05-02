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

  private _currentTime: number = 0
  private _currentDuration: number = 0

  constructor({
    id,
    isLast,
    metronome,
    partId,
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

    this._currentTime = startTime

    this.number = this.getNumber(xmlData)
    this.notes = this.getNotes(xmlData)
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

  private addNoteToList(note: NoteClass, notesList: NoteClass[]): void {
    const noteDuration = this.calNoteDuration(note)

    note.appendTime(this._currentDuration, noteDuration)
    notesList.push(note)

    this._currentDuration += noteDuration

    this.time = {
      start: this._currentTime,
      duration: this._currentDuration,
      end: this._currentTime + this._currentDuration
    }
  }

  private getNumber(measureXML: MeasureXML): string {
    return measureXML._number || ''
  }

  private isChord(noteXML: NoteXML): boolean {
    return has(noteXML, 'chord')
  }

  /**
   * 计算音符时长
   */
  private calNoteDuration(note: Note): number {
    const { kind, type, timeModification, dot } = note

    if (!type) return 0

    const { beatUnit, bpm } = this.metronome
    const { beats, beatType } = this.timeSignature

    // 每拍的时间（毫秒）
    const beatTime = 60000 / bpm / (beatType / beatUnit)

    // 计算基础时值
    let duration = kind === 'rest' && type === 'whole'
      ? beatTime * beats
      : (beatType / noteTypeToNumber(type)) * beatTime

    // 如果是连音组
    if (timeModification) {
      const { actualNotes, normalNotes } = timeModification
      duration *= normalNotes / actualNotes
    }

    // 加点音处理
    const dotMap = {
      single: 1.5,
      double: 1.75,
      triple: 1.875
    } as const

    if (dot && dotMap[dot]) {
      duration *= dotMap[dot]
    }

    return Math.floor(duration / (globalThis.speed || 1))
  }
}
