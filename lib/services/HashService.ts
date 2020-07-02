/**
 * Created by WebStorm
 * Note: Md. Toufiqul Islam
 * Date: 5/7/2020
 * Time: 8:10 AM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import * as bcrypt from 'bcrypt';
import {provide} from 'inversify-binding-decorators';
import {IHashService} from './base/IHashService';

@provide(HashService)
export class HashService implements IHashService {
    async getHashedPassword(givenPass: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(givenPass, 10, (err, encrypted) => {
                if (err) {
                    return reject(err);
                }
                resolve(encrypted);
            });
        });
    }

    async matchPassword(givenPass: string, encryptedPass: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(givenPass, encryptedPass, (err, same) => {
                if (err) {
                    return reject(err);
                }
                return resolve(same);
            });
        });
    }
}
