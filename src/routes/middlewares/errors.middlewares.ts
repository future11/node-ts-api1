import { Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

import { HttpException } from '../../exceptions';



export const getErrorHandlingMiddleware = () => (
    err: HttpException,
    req: Request<ParamsDictionary, any, any, Query>,
    res: Response<any>,
    next: (arg?: any) => any
) => {
    next(err);
};