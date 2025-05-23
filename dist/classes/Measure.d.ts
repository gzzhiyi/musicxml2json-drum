import { MeasureXML, Metronome, Note, Time, TimeSignature } from '@/types';
type PropsType = {
    id: string;
    isLast: boolean;
    metronome: Metronome;
    partId: string;
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
    private _startTime;
    private _currentTime;
    private _currentDuration;
    constructor({ id, isLast, metronome, partId, startTime, timeSignature, xmlData }: PropsType);
    private getNotes;
    private addNoteToList;
    private getNumber;
    private isChord;
    private calNoteDuration;
}
export {};
