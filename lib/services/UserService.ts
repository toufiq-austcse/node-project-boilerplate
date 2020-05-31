import {inject} from 'inversify';
import {provide} from 'inversify-binding-decorators';
import {IUserRepository} from '../repositories/base/IUserRepository';
import {IUserService} from './base/IUserService';
import {User} from '../models/User';
import {UserRepository} from '../repositories/UserRepository';

@provide(UserService)
export class UserService implements IUserService {
    constructor(@inject(UserRepository) private userRepository: IUserRepository) {
    }

    //
    create(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    getByEmail(email: string): Promise<User[]> {
        return this.userRepository.getByEmail(email);
    }

    getByUserId(_id: string): Promise<User> {
        return this.userRepository.getByUserId(_id);
    }


}
