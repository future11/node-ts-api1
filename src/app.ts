import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {
    getCommonMiddleware,
    getErrorHandlingMiddleware
} from './routes/middlewares';
import { Route } from './routes';



export class App {
    private port: number;
    private baseApiUrl: string;
    private dataApiUrl: string;

    private app;


    constructor(port: number, baseApiUrl: string, dataApiUrl: string) {
        this.port = port;
        this.baseApiUrl = baseApiUrl;
        this.dataApiUrl = dataApiUrl;

        this.app = express();
    }

    start() {
        // Configure the express server.
        this.app.use(bodyParser.json({ limit: "100kb" }));
        this.app.use(bodyParser.urlencoded({ extended: false, limit: "100kb" }));

        this.app.use(cors({ origin: '*' }));

        this.app.use(getCommonMiddleware(this.dataApiUrl));

        this.app.use(this.baseApiUrl + '/', new Route().getRouter());

        this.app.use(getErrorHandlingMiddleware());

        // Start the express server.
        const httpServer = this.app.listen(this.port, () => {
            console.log(`The server is listening on ${this.port}...`);
        });
    }

    getExpressApp() {
        return this.app;
    }
}