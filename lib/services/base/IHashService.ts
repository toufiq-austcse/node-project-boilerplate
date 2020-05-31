export interface IHashService {
    getHashedPassword(givenPass: string): Promise<string>;

    matchPassword(givenPass: string, encryptedPass: string): Promise<boolean>;
}
