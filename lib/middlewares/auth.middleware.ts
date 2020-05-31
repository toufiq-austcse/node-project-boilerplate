import * as _ from 'lodash';
import {BaseMiddleware} from 'inversify-express-utils';
import {NextFunction, Request, Response} from 'express';
import {provide} from 'inversify-binding-decorators';
import {inject} from 'inversify';
import {HashService} from '../services/HashService';
import {IHashService} from '../services/base/IHashService';
import {JwtService} from '../services/JwtService';
import getContent from '../shared/apiresponse';
import {SERVER_ERROR, UNAUTHORIZED} from '../shared/HttpStatusCodes';
import {IJwtService} from '../services/base/IJwtService';
import {UserService} from '../services/UserService';
import {IUserService} from '../services/base/IUserService';

@provide(AuthMiddleware)
export class AuthMiddleware extends BaseMiddleware {
    constructor(@inject(HashService) private hashService: IHashService,
                @inject(JwtService) private jwtService: IJwtService,
                @inject(UserService) private userService: IUserService) {
        super();
    }

    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                return res.status(UNAUTHORIZED.code).json(getContent(UNAUTHORIZED, 'authorization required in headers', []));
            }
            const accessToken = authorization.split(' ')[1];
            const decodedToken = this.jwtService.verify(accessToken);
            const user = await this.userService.getByUserId(decodedToken['_id']);
            if (!user) {
                return res.status(UNAUTHORIZED.code).json(getContent(UNAUTHORIZED, 'User Not Found', []));
            }
            req.body.user = _.omit(user,['password']);
            next();

        } catch (e) {
            return res.status(SERVER_ERROR.code).json(getContent(SERVER_ERROR, e.message, []));
        }


    }
}
