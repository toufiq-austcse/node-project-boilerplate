import {User} from '../../models/User';

export interface IUserService {
    create(user: User): Promise<User>;

    getByEmail(email: string): Promise<User[]>;

    getByUserId(_id: string): Promise<User>;
}
