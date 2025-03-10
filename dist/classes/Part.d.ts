import MeasureClass from '@/classes/Measure';
import { MeasureXML, Metronome, TimeSignature } from '@/types';
type PropsType = {
    measures: MeasureXML[];
    speed?: number;
};
export default class Part {
    duration: number;
    measures: MeasureClass[];
    metronome: Metronome;
    timeSignature: TimeSignature;
    constructor({ measures, speed }: PropsType);
    private getMetronome;
    private getTimeSignature;
    private setGlobalMetronome;
    private setGlobalTimeSignature;
}
export {};
