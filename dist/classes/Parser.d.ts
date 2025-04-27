import Part from '@/classes/Part';
import { Measure as MeasureType, Note as NoteType, InstrumentConfig as InstrumentConfigType } from '@/types';
type PropsType = {
    debug?: boolean;
    speed?: number;
    instrumentConfig: Record<number, InstrumentConfigType>;
    xmlStr: string;
};
export default class Parser {
    parts: Part[];
    title: string;
    private _debug;
    private _instrumentConfig;
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
