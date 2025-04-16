import Part from '@/classes/Part';
import { Measure as MeasureType, Note as NoteType, Instrument as InstrumentType } from '@/types';
type PropsType = {
    debug?: boolean;
    speed?: number;
    instrumentConfig: Record<number, InstrumentType>;
    xmlStr: string;
};
export default class Parser {
    parts: Part[];
    title: string;
    private _debug;
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
