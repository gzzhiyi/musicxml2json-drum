/**
 * MusicXML
 */
type ClefXML = {
  sign: 'percussion' | string
  _number: string
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

export type MusicXML = {
  'score-partwise'?: PartwiseXML
}

export type NoteXML = {
  [propName: string]: any
}

type PartwiseXML = {
  part?: PartXML[]
  work?: {
    'work-title': string
  }
}

export type PartXML = {
  _id: string
  measure?: MeasureXML | MeasureXML[]
}

type TimeSignatureXML = {
  beats?: number
  'beat-type': number
}

/**
 * Basic
 */

// 符杠
export type Beam = 'begin' | 'continue' | 'end'

// 附点
export type Dot = 'single' | 'double' | 'triple' // '附点' | '双附点' | '三附点'

// 小节
export type Measure = {
  id: string
  isLast: boolean
  metronome: Metronome
  notes: Note[]
  number: string
  partId: string
  time: Time | null
  timeSignature: TimeSignature
}

// 节拍器标记
export type Metronome = {
  beatUnit: number
  bpm: number
}

// 容器元素
export type Notations = {
  slur: Slur | null
  tied: Tied | null
  tuplet: Tuplet | null
}

// 音符
export type Note = {
  beam: Beam[] | null
  data: NoteData[] | null
  dot: Dot | null
  id: string
  measureId: string
  notations: Notations
  stem: Stem | null
  time: Time | null
  timeModification: TimeModification | null
  type: NoteType
  kind: NoteKind
}

// 音符数据
export type NoteData = {
  index: number
  code: number
  name: string
  value: number[]
}

// 音符种类
export type NoteKind = 'note' | 'chord' | 'rest'

// 音符类型
export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | '16th' | '32nd' | '64th' | '128th'

// 乐器部分
export type Part = {
  duration: number
  measures: Measure[]
  metronome: Metronome
  sign: string
  timeSignature: TimeSignature
}

// 连音线
export type Slur = 'start' | 'continue' | 'stop'

// 符干
export type Stem = 'up' | 'down'

// 延音线
export type Tied = 'start' | 'continue' | 'stop'

// 连音符
export type Tuplet = 'start' | 'stop'

// 时间
export type Time = {
  duration: number
  end: number
  start: number
}

// 音符时值比例调整（必须与 Tuplet 配合使用）
export type TimeModification = {
  actualNotes: number
  normalNotes: number
}

// 节拍记号
export type TimeSignature = {
  beats: number
  beatType: number
}

/**
 * Other
 */

// 乐器配置
export type InstrumentConfig = {
  code: number
  name: string
  value: number[]
  index: number
}
