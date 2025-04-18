import {
  find,
  isArray,
  isEmpty,
  isObject
} from 'lodash'
import { XMLValidator } from 'fast-xml-parser'
import parseXML from '@/core/parseXML'
import PartClass from '@/classes/Part'
import {
  MusicXML,
  PartXML,
  MeasureXML,
  Measure,
  Note,
  Instrument
} from '@/types'

type PropsType = {
  debug?: boolean
  speed?: number
  instrumentConfig: Record<number, Instrument>,
  xmlStr: string
}

export default class Parser {
  public parts: PartClass[] = []
  public title: string = ''

  private _debug: boolean = false
  private _oriXml: MusicXML | null = {}
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

    this._oriXml = parseXML(xmlStr) || {}
    if (!this._oriXml) {
      console.error('Failed to parse XML data.')
      return
    }

    this._speed = speed ?? this._speed

    this.parts = this.getParts(this._oriXml)?.map((part) => {
      const measures = this.getMeasures(part)
      return new PartClass({ measures, speed })
    })

    this.title = this.getTitle(this._oriXml)

    // Logs
    this._debug && console.log(this)
  }

  private getTitle(musicXml: MusicXML): string {
    return musicXml['score-partwise']?.work?.['work-title'] ?? ''
  }

  private filterParts(parts: PartXML[]): PartXML[] {
    return parts.filter(part => {
      const measure = part.measure
      const firstMeasure = isArray(measure) ? measure[0] : isObject(measure) ? measure : null
      return firstMeasure?.attributes?.clef?.sign === 'percussion'
    })
  }

  private getParts(xml: MusicXML): PartXML[] {
    const partXML = xml?.['score-partwise']?.part
    if (!partXML || isEmpty(partXML)) return []

    const parts: PartXML[] = isArray(partXML) ? partXML : [partXML]
    return this.filterParts(parts)
  }

  private getMeasures(partXML: PartXML): MeasureXML[] {
    const measure = partXML.measure;
    if (isArray(measure)) return measure
    if (isObject(measure)) return [measure]
    return []
  }

  getMeasureById(id: string): Measure | null {
    for (const part of this.parts) {
      const measure = find(part.measures, { id })
      if (measure) {
        return measure
      }
    }

    return null
  }

  getNoteById(id: string): Note | null {
    const allNotes = this.parts.flatMap(part =>
      part.measures.flatMap(measure => measure.notes)
    )

    return find(allNotes, { id }) || null
  }
}
