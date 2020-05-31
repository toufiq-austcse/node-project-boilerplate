import {User} from '../../models/User';

export interface IAuthService {
    authUser(email: string, password: string): Promise<User>;
}
