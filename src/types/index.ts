/**
 * MusicXML 原始数据
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
  sign: 'percussion' | string
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

/**
 * Basic
 */
export type Beam = 'begin' | 'continue' | 'end'

export type Dot = 'dot' | 'doubleDot' | 'tripleDot' // '附点' | '双附点' | '三附点'

export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd' | '64th' | '128th'

export type NoteKind = 'note' | 'chord' | 'rest'

export type Slur = 'start' | 'continue' | 'stop'

export type Stem = 'up' | 'down'

export type Tied = 'start' | 'continue' | 'stop'

export type Tuplet = 'start' | 'stop'

export type Notations = {
  slur: Slur | null // 连奏
  tied: Tied | null // 延音
  tuplet: Tuplet | null // 分组
}

export type TimeModification = {
  actualNotes: number
  normalNotes: number
}

export type Metronome = {
  beatUnit: number
  bpm: number
}

export type TimeSignature = {
  beats: number
  beatType: number
}

export type Instrument = {
  code: number
  name: string
  value: number[]
  index: number
}

export type Part = {
  duration: number
  measures: Measure[]
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
  view: NoteKind
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
