import { Instruments } from '@/types'

declare global {
  var Instruments: Record<number, Instruments> | undefined
  var speed: number
}
