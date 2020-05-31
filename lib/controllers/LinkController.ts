/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 5/26/2020
 * Time: 1:03 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import * as uniqid from 'uniqid';
import {BaseHttpController, controller, httpPost, requestBody} from 'inversify-express-utils';
import {linkValidator} from '../validators/validate';
import validate from '../validators';
import * as urlValidator from 'valid-url';
import getContent from '../shared/apiresponse';
import {BAD_REQUEST, OK} from '../shared/HttpStatusCodes';
import {BASE_URL} from '../environments';
import {inject} from 'inversify';
import {LinkService} from '../services/LinkService';
import {ILinkService} from '../services/base/ILinkService';
import {TYPES} from '../types/type';

@controller('/api/v1/link')
export class LinkController extends BaseHttpController {
    constructor(@inject(LinkService) private linkService: ILinkService) {
        super();
    }

    @httpPost('', validate(linkValidator), TYPES.AuthMiddleware)
    public async createLink(@requestBody() body: any) {
        const {url, user} = body;
        if (urlValidator.isHttpUri(url) || urlValidator.isHttpsUri(url)) {
            const uniqId = uniqid();
            await this.linkService.create({
                url,
                unique_id: uniqId,
                user_id: user['_id']
            });
            return this.json(getContent(OK, 'Ok', [{base_url: BASE_URL, unique_id: uniqId}]), OK.code);
        } else {
            return this.json(getContent(BAD_REQUEST, 'Invalid Url', []), BAD_REQUEST.code);
        }
    }
}
