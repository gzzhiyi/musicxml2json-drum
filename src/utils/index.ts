import { NoteData, NoteType } from '@/types'

const noteTypeMap: Record<NoteType, number> = {
  'whole': 1,
  'half': 2,
  'quarter': 4,
  'eighth': 8,
  '16th': 16,
  '32nd': 32,
  '64th': 64,
  '128th': 128
}

const numberToNoteTypeMap: Record<number, NoteType> = {
  1: 'whole',
  2: 'half',
  4: 'quarter',
  8: 'eighth',
  16: '16th',
  32: '32nd',
  64: '64th',
  128: '128th'
}

function logInvalidNoteType(type: string | number): void {
  console.warn(`Note type [${type}] is invalid.`)
}

/**
 * 音符类型转成数字
 */
export function noteTypeToNumber(type: NoteType): number {
  const number = noteTypeMap[type]
  if (number === undefined) {
    logInvalidNoteType(type)
    return -1
  }
  return number
}

/**
 * 数字转成音符类型
 */
export function numberToNoteType(num: number): NoteType | undefined {
  const type = numberToNoteTypeMap[num]
  if (type === undefined) {
    logInvalidNoteType(num)
    return undefined
  }
  return type
}

export function getInstrument(code: number, noteId?: string): NoteData | undefined {
  const instrument = globalThis.InstrumentConfig?.[code]

  if (!instrument) {
    console.warn(`[${noteId}] Instrument ${code} is not a valid code!`)
    return undefined
  }

  return instrument
}
