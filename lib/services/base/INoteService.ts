import {Note} from "../../entity/Note";

export interface INoteService {
    create(note: Note): Promise<Note>;

    findById(id: number): Promise<Note>;

    update(note: Note): Promise<Note>;

    delete(id: number);
}
