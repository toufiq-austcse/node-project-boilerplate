/**
 * Created by WebStorm
 * Note: Md. Toufiqul Islam
 * Date: 6/29/2020
 * Time: 6:57 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import {Note} from '../entity/Note';
import {provide} from 'inversify-binding-decorators';
import {decorate, injectable} from 'inversify';
import {EntityRepository, Repository} from 'typeorm';

decorate(injectable(), Repository);

@EntityRepository(Note)
@provide(NoteRepository)
export class NoteRepository extends Repository<Note> {

}
