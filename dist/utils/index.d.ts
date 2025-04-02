import { NoteData, NoteType } from '@/types';
export declare function noteTypeToNumber(type: NoteType): number;
export declare function numberToNoteType(num: number): NoteType | undefined;
export declare function getInstrument(code: number, noteId?: string): NoteData | undefined;
