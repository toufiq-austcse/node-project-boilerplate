import {IAuthService} from './base/IAuthService';
import {provide} from 'inversify-binding-decorators';
import {User} from '../models/User';
import {inject} from 'inversify';
import {UserService} from './UserService';
import {IUserService} from './base/IUserService';
import {HashService} from './HashService';
import {IHashService} from './base/IHashService';

@provide(AuthService)
export class AuthService implements IAuthService {
    constructor(@inject(UserService) private userService: IUserService,
                @inject(HashService) private hashService: IHashService) {
    }

    async authUser(email: string, password: string): Promise<User> {
        try {
            const users = await this.userService.getByEmail(email);
            if (users.length === 0) {
                return null;
            }
            const isPasswordMatched = await this.hashService.matchPassword(password, users[0].password);
            return isPasswordMatched ? users[0] : null;
        } catch (e) {
            throw new Error(e);
        }
    }

}
