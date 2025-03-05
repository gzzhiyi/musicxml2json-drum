import { NoteData, NoteType } from '@/types'

/**
 * 音符类型转成数字
 */
export function noteTypeToNumber(type: NoteType): number {
  const types = {
    'whole': 1,
    'half': 2,
    'quarter': 4,
    'eighth': 8,
    '16th': 16,
    '32nd': 32,
    '64th': 64
  }

  if (!types[type]) {
    console.warn(`Note type [${type}] is invalid.`);
  }

  return types[type];
}

/**
 * 数字转成音符类型
 */
export function numberToNoteType(num: number): NoteType {
  const types = {
    1: 'whole',
    2: 'half',
    4: 'quarter',
    8: 'eighth',
    16: '16th',
    32: '32nd',
    64: '64th'
  }

  if (!types[num]) {
    console.warn(`Note type [${num}] is invalid.`);
  }

  return types[num];
}

/**
 * 获取音色
 */
const InstrumentMap = {
  36: { code: 36, name: 'Kick', simCode: 36, value: [36], index: 0 },
  37: { code: 37, name: 'Snare', simCode: 37, value: [37], index: 1 },
  38: { code: 38, name: 'Snare', simCode: 38, value: [38, 125], index: 2 },
  42: { code: 42, name: 'Hi-Hat', simCode: 42, value: [22, 42], index: 3 },
  43: { code: 43, name: 'Tom3', simCode: 43, value: [43, 74], index: 4 },
  44: { code: 44, name: 'Hi-hat', simCode: 44, value: [23, 44], index: 5 },
  45: { code: 45, name: 'Tom2', simCode: 45, value: [45, 77], index: 6 },
  46: { code: 46, name: 'Hi-hat', simCode: 46, value: [14, 46], index: 7 },
  48: { code: 48, name: 'Tom1', simCode: 48, value: [48, 81], index: 1 },
  49: { code: 49, name: 'Crash', simCode: 49, value: [27, 49, 58], index: 2 },
  51: { code: 51, name: 'Ride', simCode: 51, value: [51, 59], index: 2 },
  91: { code: 91, name: 'Ride', simCode: 91, value: [40, 91], index: 3 },
  92: { code: 92, name: 'Hi-hat', simCode: 92, value: [12, 64, 92], index: 4 }
}

export function getInstrument(code: number, noteId?: string): NoteData {
  const instrument = InstrumentMap[code]

  if (!instrument) {
    console.warn(`[${noteId}]Instrument ${code} is not a vaild code!`)
  }

  return instrument || {}
}
