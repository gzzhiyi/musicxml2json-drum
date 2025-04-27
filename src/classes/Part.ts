import { isArray, isEmpty } from 'lodash'
import { noteTypeToNumber } from '@/utils'
import Measure from '@/classes/Measure'
import {
  MeasureXML as MeasureXmlType,
  Metronome as MetronomeType,
  TimeSignature as TimeSignatureType
} from '@/types'

type PropsType = {
  measures: MeasureXmlType[]
  partId: string
  speed?: number
}

export default class Part {
  public duration = 0
  public measures: Measure[] = []
  public metronome: MetronomeType = { beatUnit: 4, bpm: 60 }
  public sign = 'percussion'
  public speed: number
  public timeSignature: TimeSignatureType = { beats: 4, beatType: 4 }

  constructor({ measures, partId, speed }: PropsType) {
    this.speed = speed || 1
    globalThis.speed = this.speed

    measures.forEach((measure, index) => {
      const metronome = this.getMetronome(measure)
      metronome && this.setGlobalMetronome(metronome)

      const timeSignature = this.getTimeSignature(measure)
      timeSignature && this.setGlobalTimeSignature(timeSignature)

      const measureClass = new Measure({
        id: `M_${index + 1}`,
        isLast: index === measures.length - 1,
        metronome: this.metronome,
        partId,
        startTime: this.duration,
        timeSignature: this.timeSignature,
        xmlData: measure
      })

      this.duration += measureClass.time?.duration || 0
      this.measures.push(measureClass)
    })
  }

  private getMetronome(measureXML: MeasureXmlType): MetronomeType | null {
    const directions = isArray(measureXML?.direction) ? measureXML.direction : [measureXML?.direction]

    for (const item of directions) {
      const metronomeXML = item?.['direction-type']?.metronome

      if (metronomeXML) {
        return {
          beatUnit: noteTypeToNumber(metronomeXML['beat-unit']),
          bpm: metronomeXML['per-minute']
        }
      }
    }

    return null
  }

  private getTimeSignature(measureXML: MeasureXmlType): TimeSignatureType | null {
    const timeXML = measureXML?.attributes?.time

    return isEmpty(timeXML) ? null : {
      beats: timeXML?.beats || 0,
      beatType: timeXML?.['beat-type'] || 0
    }
  }

  private setGlobalMetronome({ beatUnit, bpm }: MetronomeType) {
    this.metronome = { beatUnit, bpm }
  }

  private setGlobalTimeSignature({ beats, beatType }: TimeSignatureType) {
    this.timeSignature = { beats, beatType }
  }
}
