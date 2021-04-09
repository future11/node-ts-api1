import { Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';



export type CommonMiddleware = (
    req: Request<ParamsDictionary, any, any, Query, Record<string, any>>,
    res: Response<any>,
    next: (arg?: any) => any
) => void;

export const getCommonMiddleware = (
    dataApiUrl: string
) => (
    req: Request<ParamsDictionary, any, any, Query, Record<string, any>>,
    res: Response<any>,
    next: (arg?: any) => any
) => {
    req.dataApiUrl = dataApiUrl;

    next();
};