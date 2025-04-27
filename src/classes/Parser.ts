import {
  find,
  isArray,
  isEmpty,
  isObject
} from 'lodash'
import { XMLValidator } from 'fast-xml-parser'
import parseXML from '@/core/parseXML'
import Part from '@/classes/Part'
import {
  MusicXML as MusicXmlType,
  PartXML as PartXmlType,
  MeasureXML as MeasureXmlType,
  Measure as MeasureType,
  Note as NoteType,
  InstrumentConfig as InstrumentConfigType
} from '@/types'

type PropsType = {
  debug?: boolean
  speed?: number
  instrumentConfig: Record<number, InstrumentConfigType>,
  xmlStr: string
}

export default class Parser {
  public parts: Part[] = []
  public title: string = ''

  private _debug: boolean = false
  private _instrumentConfig: Record<number, InstrumentConfigType> | null = null
  private _oriXml: MusicXmlType | null = {}
  private _speed: number = 1

  constructor(props: PropsType) {
    const {
      debug,
      instrumentConfig,
      speed,
      xmlStr
    } = props

    if (!XMLValidator.validate(xmlStr)) {
      console.error('Invalid XML format.')
      return
    }

    globalThis.InstrumentConfig = instrumentConfig

    // Original data
    this._debug = debug ?? this._debug

    this._instrumentConfig = instrumentConfig

    this._oriXml = parseXML(xmlStr) || {}
    if (!this._oriXml) {
      console.error('Failed to parse XML data.')
      return
    }

    this._speed = speed ?? this._speed

    this.parts = this.getParts(this._oriXml)?.map((part) => {
      const measures = this.getMeasures(part)
      return new Part({ measures, partId: part._id, speed })
    })

    this.title = this.getTitle(this._oriXml)

    // Logs
    this._debug && console.log(this)
  }

  private getTitle(musicXml: MusicXmlType): string {
    return musicXml['score-partwise']?.work?.['work-title'] ?? ''
  }

  private filterParts(parts: PartXmlType[]): PartXmlType[] {
    return parts.filter(part => {
      const measure = part.measure
      const firstMeasure = isArray(measure) ? measure[0] : isObject(measure) ? measure : null
      return firstMeasure?.attributes?.clef?.sign === 'percussion'
    })
  }

  private getParts(xml: MusicXmlType): PartXmlType[] {
    const partXML = xml?.['score-partwise']?.part
    if (!partXML || isEmpty(partXML)) return []

    const parts: PartXmlType[] = isArray(partXML) ? partXML : [partXML]
    return this.filterParts(parts)
  }

  private getMeasures(partXML: PartXmlType): MeasureXmlType[] {
    const measure = partXML.measure;
    if (isArray(measure)) return measure
    if (isObject(measure)) return [measure]
    return []
  }

  getMeasureById(id: string): MeasureType | null {
    for (const part of this.parts) {
      const measure = find(part.measures, { id })
      if (measure) {
        return measure
      }
    }

    return null
  }

  getNoteById(id: string): NoteType | null {
    const allNotes = this.parts.flatMap(part =>
      part.measures.flatMap(measure => measure.notes)
    )

    return find(allNotes, { id }) || null
  }
}
