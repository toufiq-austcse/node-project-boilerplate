/**
 * Created by WebStorm
 * Note: Md. Toufiqul Islam
 * Date: 5/26/2020
 * Time: 1:03 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import {
    BaseHttpController,
    controller,
    httpDelete,
    httpGet,
    httpPatch,
    httpPost,
    requestBody,
    requestParam
} from 'inversify-express-utils';
import {inject} from 'inversify';

import getContent from '../shared/apiresponse';
import {OK, SERVER_ERROR} from '../shared/HttpStatusCodes';
import {NoteService} from "../services/NoteService";
import {INoteService} from "../services/base/INoteService";


@controller('/api/v1/note')
export class NoteController extends BaseHttpController {
    constructor(@inject(NoteService) private noteService: INoteService) {
        super();
    }

    @httpPost('')
    public async create(@requestBody() body: any) {
        try {
            const note = await this.noteService.create(body);
            return this.json(getContent(OK, '', note), OK.code);
        } catch (e) {
            console.log(e);
            return this.json(getContent(SERVER_ERROR, e.message, []), SERVER_ERROR.code);
        }
    }

    @httpGet('/:id')
    public async findById(@requestParam('id') id: number) {
        try {
            const note = await this.noteService.findById(id);
            return this.json(getContent(OK, '', note), OK.code);
        } catch (e) {
            console.log(e);
            return this.json(getContent(SERVER_ERROR, e.message, []), SERVER_ERROR.code);
        }
    }

    @httpPatch('')
    public async update(@requestBody() body: any) {
        try {
            const note = await this.noteService.update(body);
            return this.json(getContent(OK, '', note), OK.code);
        } catch (e) {
            console.log(e);
            return this.json(getContent(SERVER_ERROR, e.message, []), SERVER_ERROR.code);
        }
    }

    @httpDelete('/:id')
    public async delete(@requestParam('id') id: number) {
        try {
            const note = await this.noteService.delete(id);
            return this.json(getContent(OK, '', note), OK.code);
        } catch (e) {
            console.log(e);
            return this.json(getContent(SERVER_ERROR, e.message, []), SERVER_ERROR.code);
        }
    }
}
