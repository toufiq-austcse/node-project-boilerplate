export interface IJwtService {
    getToken(payload: any): string;

    verify(token: string): any;
}
