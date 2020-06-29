import {Repository} from './base/repository';
import {User, UserDocument, UserModel} from '../models/User';
import {inject} from 'inversify';
import {provide} from 'inversify-binding-decorators';
import {IUserRepository} from './base/IUserRepository';

@provide(UserRepository)
export class UserRepository extends Repository<UserDocument, User> implements IUserRepository {
    constructor(@inject('UserModel') UserModel: any) {
        super(UserModel);

    }

    getByEmail(email: string): Promise<User[]> {
        return super.find({email}, 1);
    }

    getByUserId(_id: string): Promise<User> {
        return super.get(_id);
    }
}

