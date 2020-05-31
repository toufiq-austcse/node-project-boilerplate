import * as joi from 'joi';
import getContent from '../shared/apiresponse';
import {BAD_REQUEST} from '../shared/HttpStatusCodes';


const validate = (schema) => {
    return (req, res, next1) => {
        const {error} = joi.validate(req.body, schema);
        const valid = error === null;
        if (valid) {
            next1();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            res.status(400).json(getContent(BAD_REQUEST,message,[]));
        }
    };
};

export default validate;
