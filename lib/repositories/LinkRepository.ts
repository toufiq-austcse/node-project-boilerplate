/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 5/26/2020
 * Time: 12:59 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import {ILinkRepository} from './base/ILinkRepository';
import {Repository} from './base/repository';
import {Link, LinkDocument} from '../models/Link';
import {provide} from 'inversify-binding-decorators';
import {inject} from 'inversify';
import {TYPES} from '../types/type';

@provide(LinkRepository)
export class LinkRepository extends Repository<LinkDocument, Link> implements ILinkRepository {
    constructor(@inject(TYPES.LinkModel) LinkModel: any) {
        super(LinkModel);

    }

}
