class HttpException extends Error {
    code: number;
    status: string;
    message: string;
    data: any;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.status = 'Error';
        this.message = message;
    }
}

export default HttpException;
