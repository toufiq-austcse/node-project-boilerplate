export interface HttpStatus {
    status: string;
    code: number;
}

export const OK: HttpStatus = {
    status: 'Ok',
    code: 200
};
export const CREATED: HttpStatus = {
    status: 'Created',
    code: 201
};
export const SERVER_ERROR: HttpStatus = {
    status: 'Internal Server Error',
    code: 500
};
export const BAD_REQUEST: HttpStatus = {
    status: 'Bad Request',
    code: 400
};
export const UNAUTHORIZED: HttpStatus = {
    status: 'Unauthorized',
    code: 401
};
