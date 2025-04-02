import { MeasureXML, Metronome, Note, Time, TimeSignature } from '@/types';
type PropsType = {
    divisions: number;
    id: string;
    isLast: boolean;
    metronome: Metronome;
    speed: number;
    startTime: number;
    timeSignature: TimeSignature;
    xmlData: MeasureXML;
};
export default class Measure {
    divisions: number;
    metronome: Metronome;
    notes: Note[];
    number: string;
    id: string;
    isLast: boolean;
    time: Time | null;
    timeSignature: TimeSignature;
    private speed;
    private startTime;
    constructor({ divisions, id, xmlData, startTime, isLast, metronome, speed, timeSignature }: PropsType);
    private getNotes;
    private addNoteToList;
    private getNumber;
    private isChord;
    private calNoteDuration;
}
export {};
