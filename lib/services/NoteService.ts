/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 7/1/2020
 * Time: 3:33 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import {NoteRepository} from '../repositories/NoteRepository';
import {provide} from 'inversify-binding-decorators';
import {Note} from '../entity/Note';
import {getCustomRepository} from 'typeorm';
import {INoteService} from "./base/INoteService";

@provide(NoteService)
export class NoteService implements INoteService {
    private noteRepository: NoteRepository;

    constructor() {
        this.noteRepository = getCustomRepository(NoteRepository);

    }

    create(note: Note): Promise<Note> {
        console.log(note);
        return this.noteRepository.save(note);
    }

    findById(id: number): Promise<Note> {
        return this.noteRepository.findOne({id});
    }

    update(note: Note): Promise<Note> {
        return this.noteRepository.save(note);
    }

    delete(id: number) {
        return this.noteRepository.delete(id);
    }
}
