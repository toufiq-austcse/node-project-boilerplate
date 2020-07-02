/**
 * Created by WebStorm
 * Note: Md. Toufiqul Islam
 * Date: 5/26/2020
 * Time: 1:01 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import {ILinkService} from './base/ILinkService';
import {User} from '../models/User';
import {Link} from '../models/Link';
import {inject} from 'inversify';
import {LinkRepository} from '../repositories/LinkRepository';
import {ILinkRepository} from '../repositories/base/ILinkRepository';
import {provide} from 'inversify-binding-decorators';

@provide(LinkService)
export class LinkService implements ILinkService {
    constructor(@inject(LinkRepository) private linkRepository: ILinkRepository) {
    }

    create(link: Link): Promise<Link> {
        return this.linkRepository.create(link);
    }

}
