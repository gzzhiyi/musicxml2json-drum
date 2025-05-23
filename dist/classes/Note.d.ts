import { Beam, Dot, Notations, Note as NoteT, NoteData, NoteType, NoteKind, NoteXML, Stem, Time, TimeModification } from '@/types';
type PropsType = {
    measureId: string;
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
    measureId: string;
    notations: Notations;
    stem: Stem | null;
    time: Time | null;
    timeModification: TimeModification | null;
    type: NoteType;
    kind: NoteKind;
    constructor({ id, measureId, xmlData }: PropsType);
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
