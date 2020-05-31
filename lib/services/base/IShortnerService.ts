export interface IShortnerService {
    getShortUrl(url: string): Promise<string>;
}
