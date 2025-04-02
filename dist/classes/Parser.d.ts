import PartClass from '@/classes/Part';
import { Measure, Note, Instrument } from '@/types';
type PropsType = {
    debug?: boolean;
    speed?: number;
    instrumentConfig: Record<number, Instrument>;
    xmlStr: string;
};
export default class Parser {
    parts: PartClass[];
    title: string;
    private _debug;
    private _oriXml;
    private _speed;
    constructor(props: PropsType);
    private getTitle;
    private filterParts;
    private getParts;
    private getMeasures;
    getMeasureById(id: string): Measure | null;
    getNoteById(id: string): Note | null;
}
export {};
