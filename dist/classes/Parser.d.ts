import Part from '@/classes/Part';
import { Measure as MeasureType, Note as NoteType, Instruments as InstrumentsType } from '@/types';
type PropsType = {
    debug?: boolean;
    speed?: number;
    instruments: Record<number, InstrumentsType>;
    xmlStr: string;
};
export default class Parser {
    parts: Part[];
    title: string;
    private _debug;
    private _instruments;
    private _oriXml;
    private _speed;
    constructor(props: PropsType);
    private getTitle;
    private filterParts;
    private getParts;
    private getMeasures;
    getMeasureById(id: string): MeasureType | null;
    getNoteById(id: string): NoteType | null;
}
export {};
