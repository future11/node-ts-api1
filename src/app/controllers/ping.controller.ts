import { Request, Response } from 'express';

import { PingService } from '../services';



export class PingController {
    static ping = (req: Request, res: Response) => {
        const pingService = new PingService();

        res.status(200).json(pingService.getPingResponse());
    };
}