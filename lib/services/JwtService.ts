/**
 * Created by WebStorm
 * Note: Md. Toufiqul Islam
 * Date: 5/7/2020
 * Time: 7:50 AM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import * as jwt from 'jsonwebtoken';
import {provide} from 'inversify-binding-decorators';
import {IJwtService} from './base/IJwtService';
import {JWT_KEY} from '../environments';

@provide(JwtService)
export class JwtService implements IJwtService {

    getToken(payload: any): string {
        return jwt.sign(payload, JWT_KEY);
    }

    verify(token: string): any {
        return jwt.verify(token, JWT_KEY);
    }
}
