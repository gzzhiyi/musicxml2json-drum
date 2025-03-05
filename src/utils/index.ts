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
  36: { code: 36, name: 'Kick', drumName: '', simCode: 36, value: [36], drumIndex: 0 },
  37: { code: 37, name: 'Snare', drumName: '', simCode: 37, value: [37], drumIndex: 1 },
  38: { code: 38, name: 'Snare', drumName: '', simCode: 38, value: [38, 125], drumIndex: 2 },
  42: { code: 42, name: 'Hi-Hat', drumName: '', simCode: 42, value: [22, 42], drumIndex: 3 },
  43: { code: 43, name: 'Tom3', drumName: '', simCode: 43, value: [43, 74], drumIndex: 4 },
  44: { code: 44, name: 'Hi-hat', drumName: '', simCode: 44, value: [23, 44], drumIndex: 5 },
  45: { code: 45, name: 'Tom2', drumName: '', simCode: 45, value: [45, 77], drumIndex: 6 },
  46: { code: 46, name: 'Hi-hat', drumName: '', simCode: 46, value: [14, 46], drumIndex: 7 },
  48: { code: 48, name: 'Tom1', drumName: '', simCode: 48, value: [48, 81], drumIndex: 1 },
  49: { code: 49, name: 'Crash', drumName: '', simCode: 49, value: [27, 49, 58], drumIndex: 2 },
  51: { code: 51, name: 'Ride', drumName: '', simCode: 51, value: [51, 59], drumIndex: 2 },
  91: { code: 91, name: 'Ride', drumName: '', simCode: 91, value: [40, 91], drumIndex: 3 },
  92: { code: 92, name: 'Hi-hat', drumName: '', simCode: 92, value: [12, 64, 92], drumIndex: 4 }
}

export function getInstrument(code: number, noteId?: string): NoteData {
  const instrument = InstrumentMap[code]

  if (!instrument) {
    console.warn(`[${noteId}]Instrument ${code} is not a vaild code!`)
  }

  return instrument || {}
}
