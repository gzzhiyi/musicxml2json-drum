import { isArray, isEmpty } from 'lodash'
import { noteTypeToNumber } from '@/utils'
import MeasureClass from '@/classes/Measure'
import { MeasureXML, Metronome, TimeSignature } from '@/types'

type PropsType = {
  measures: MeasureXML[]
  speed?: number
}

export default class Part {
  public duration: number = 0
  public measures: MeasureClass[] = []
  public metronome: Metronome = { beatUnit: 4, bpm: 60 }
  public timeSignature: TimeSignature = { beats: 4, beatType: 4 }

  constructor({ measures, speed }: PropsType) {
    let globalDivisions = 1

    measures.forEach((measure, index) => {
      const metronome = this.getMetronome(measure)
      metronome && this.setGlobalMetronome(metronome)

      const timeSignature = this.getTimeSignature(measure)
      timeSignature && this.setGlobalTimeSignature(timeSignature)

      globalDivisions = this.getDivisions(measure) || globalDivisions

      const measureClass = new MeasureClass({
        divisions: globalDivisions,
        id: `M_${index + 1}`,
        isLast: index === measures.length - 1,
        metronome: this.metronome,
        speed: speed || 1,
        startTime: this.duration,
        timeSignature: this.timeSignature,
        xmlData: measure
      })

      this.duration += measureClass.time?.duration || 0
      this.measures.push(measureClass)
    })
  }

  private getDivisions(measureXML: MeasureXML): number | null {
    return measureXML?.attributes?.divisions || null
  }

  private getMetronome(measureXML: MeasureXML): Metronome | null {
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

  private getTimeSignature(measureXML: MeasureXML): TimeSignature | null {
    const timeXML = measureXML?.attributes?.time

    return isEmpty(timeXML) ? null : {
      beats: timeXML?.beats || 0,
      beatType: timeXML?.['beat-type'] || 0
    }
  }

  private setGlobalMetronome({ beatUnit, bpm }: Metronome) {
    this.metronome = { beatUnit, bpm }
  }

  private setGlobalTimeSignature({ beats, beatType }: TimeSignature) {
    this.timeSignature = { beats, beatType }
  }
}
