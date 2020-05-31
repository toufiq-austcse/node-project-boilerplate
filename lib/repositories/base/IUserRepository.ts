import {User} from '../../models/User';

export interface IUserRepository {
    create(user: User): Promise<User>;

    getByEmail(email: string): Promise<User[]>;

    getByUserId(_id: string): Promise<User>;
}
