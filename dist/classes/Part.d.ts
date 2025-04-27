import Measure from '@/classes/Measure';
import { MeasureXML as MeasureXmlType, Metronome as MetronomeType, TimeSignature as TimeSignatureType } from '@/types';
type PropsType = {
    measures: MeasureXmlType[];
    partId: string;
    speed?: number;
};
export default class Part {
    duration: number;
    measures: Measure[];
    metronome: MetronomeType;
    sign: string;
    speed: number;
    timeSignature: TimeSignatureType;
    constructor({ measures, partId, speed }: PropsType);
    private getMetronome;
    private getTimeSignature;
    private setGlobalMetronome;
    private setGlobalTimeSignature;
}
export {};
