import { Beam, Dot, Notations, Note as NoteT, NoteData, NoteType, NoteView, NoteXML, Stem, Time, TimeModification } from '@/types';
type PropsType = {
    id: string;
    xmlData?: NoteXML;
};
interface NoteInterface extends NoteT {
    appendData(data: NoteData): void;
    getData(noteXML: NoteXML): NoteData | null;
}
export default class Note implements NoteInterface {
    beam: Beam[] | null;
    data: NoteData[] | null;
    dot: Dot | null;
    id: string;
    name: string;
    notations: Notations;
    stem: Stem | null;
    time: Time | null;
    timeModification: TimeModification | null;
    type: NoteType;
    view: NoteView;
    constructor({ id, xmlData }: PropsType);
    private getBeam;
    private getCode;
    getData(noteXML: NoteXML): NoteData | null;
    private getDot;
    private getView;
    private getNotations;
    private getSlur;
    private getStem;
    private getTied;
    private getTimeModification;
    private getTuplet;
    private getType;
    appendData(data: NoteData): void;
    appendTime(start: number, duration: number): void;
}
export {};
