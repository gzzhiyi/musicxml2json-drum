/**
 * Basic
 */
export type Beam = 'begin' | 'continue' | 'end'

export type Dot = 'dot' | 'doubleDot'

export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd' | '64th'

export type NoteView = 'single' | 'chord' | 'rest'

export type Slur = 'start' | 'continue' | 'end'

export type Stem = 'up' | 'down'

export type Tied = 'start' | 'continue' | 'stop'

export type Tuplet = 'start' | 'stop'

/**
 * XML
 */
export type MusicXML = {
  'score-partwise'?: PartwiseXML
}

type PartwiseXML = {
  part?: PartXML[]
  work?: {
    'work-title': string
  }
}

export type PartXML = {
  measure?: MeasureXML | MeasureXML[]
}

type ClefXML = {
  sign: string
  _number: string
}

type TimeSignatureXML = {
  beats?: number
  'beat-type': number
}

type MeasureAttributesXML = {
  clef?: ClefXML
  divisions?: number
  time?: TimeSignatureXML
}

export type MeasureXML = {
  [propName: string]: any
  attributes?: MeasureAttributesXML
  note?: any
}

export type NoteXML = {
  [propName: string]: any
}

export interface NoteData {
  index: number
  code: number
  name: string
  value: number[]
}

export interface Time {
  start: number
  duration: number
  end: number
}

export type Notations = {
  slur: Slur | null
  tied: Tied | null
  tuplet: Tuplet | null
}

export type TimeModification = {
  actualNotes: number
  normalNotes: number
}

export type Note = {
  beam: Beam[] | null
  data: NoteData[] | null
  dot: Dot | null
  id: string
  notations: Notations
  stem: Stem | null
  time: Time | null
  timeModification: TimeModification | null
  type: NoteType
  view: NoteView
}

export type Metronome = {
  beatUnit: number
  bpm: number
}

export type TimeSignature = {
  beats: number
  beatType: number
}

export type Measure = {
  divisions: number
  id: string
  isLast: boolean
  metronome: Metronome
  notes: Note[]
  number: string
  time: Time | null
  timeSignature: TimeSignature
}

export type Part = {
  duration: number
  measures: Measure[]
}

export type Instrument = {
  code: number
  name: string
  value: number[]
  index: number
}
