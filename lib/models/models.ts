import {UserModel} from './User';
import {LinkModel} from './Link';
import {TYPES} from '../types/type';

/* Register your models here */
const models = [
    {type: TYPES.UserModel, model: UserModel},
    {type: TYPES.LinkModel, model: LinkModel},
];

export default models;
