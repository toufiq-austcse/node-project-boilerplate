import 'reflect-metadata';
import {BaseHttpController, controller, httpGet, httpPost, requestBody} from 'inversify-express-utils';
import {inject} from 'inversify';
import {UserService} from '../services/UserService';
import {User} from '../models/User';
import {userValidator} from '../validators/validate';
import validate from '../validators';
import {HashService} from '../services/HashService';
import {IUserService} from '../services/base/IUserService';
import {IHashService} from '../services/base/IHashService';
import {JwtService} from '../services/JwtService';
import {IJwtService} from '../services/base/IJwtService';
import getContent from '../shared/apiresponse';
import {AuthService} from '../services/AuthService';
import {IAuthService} from '../services/base/IAuthService';
import {CREATED, OK, SERVER_ERROR, UNAUTHORIZED} from '../shared/HttpStatusCodes';
import {NextFunction} from 'express';
import {TYPES} from '../types/type';


@controller('/api/v1/user')
export class UserController extends BaseHttpController {
    constructor(@inject(UserService) private userService: IUserService,
                @inject(HashService) private hashService: IHashService,
                @inject(JwtService) private jwtService: IJwtService,
                @inject(AuthService) private authService: IAuthService) {
        super();

    }

    @httpPost('', validate(userValidator))
    public async create(@requestBody()user: User,next:NextFunction) {
        try {
            user.password = await this.hashService.getHashedPassword(user.password);
            const dbUser = await this.userService.create(user);
            const token = await this.jwtService.getToken({_id: dbUser['_id'], email: dbUser.email});
            return this.json(getContent(CREATED, '', [{token, token_type: 'Bearer'}]), CREATED.code);
        } catch (e) {
            return this.json(getContent(SERVER_ERROR, e.message, []), SERVER_ERROR.code);

        }
    }

    @httpPost('/auth')
    public async auth(@requestBody() body: any) {
        try {
            const {email, password} = body;
            const user = await this.authService.authUser(email, password);
            if (user) {
                const token = await this.jwtService.getToken({_id: user['_id'], email: user.email});
                return this.json(getContent(OK, '', [{token, token_type: 'Bearer'}]), OK.code);
            } else {
                return this.json(getContent(UNAUTHORIZED, '', []), 401);
            }
        } catch (e) {
            return this.json(getContent(SERVER_ERROR, e.message, []), SERVER_ERROR.code);
        }
    }

    @httpGet('', TYPES.AuthMiddleware)
    public async getUser(@requestBody() body: any) {
        try {
            return this.json(getContent(OK, '', [{user:body.user}]), OK.code);
        } catch (e) {
            return this.json(getContent(SERVER_ERROR, e.message, []), SERVER_ERROR.code);
        }
    }
}
