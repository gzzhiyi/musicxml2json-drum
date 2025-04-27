import { InstrumentConfig } from '@/types'

declare global {
  var InstrumentConfig: Record<number, InstrumentConfig> | undefined
  var speed: number
}
