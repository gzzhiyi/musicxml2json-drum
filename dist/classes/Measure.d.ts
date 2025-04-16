import { MeasureXML, Metronome, Note, Time, TimeSignature } from '@/types';
type PropsType = {
    id: string;
    isLast: boolean;
    metronome: Metronome;
    partId: string;
    speed: number;
    startTime: number;
    timeSignature: TimeSignature;
    xmlData: MeasureXML;
};
export default class Measure {
    id: string;
    isLast: boolean;
    metronome: Metronome;
    notes: Note[];
    number: string;
    partId: string;
    time: Time | null;
    timeSignature: TimeSignature;
    private speed;
    private startTime;
    constructor({ id, isLast, metronome, partId, speed, startTime, timeSignature, xmlData }: PropsType);
    private getNotes;
    private addNoteToList;
    private getNumber;
    private isChord;
    private calNoteDuration;
}
export {};
