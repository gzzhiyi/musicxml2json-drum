import { Instrument } from '@/types'

declare global {
  var InstrumentConfig: Record<number, Instrument> | undefined
}
