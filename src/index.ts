import { get as getConfig } from 'config';

import { App } from './app';



export const app = new App(
    getConfig("app.port"),
    getConfig("app.baseApiUrl"),
    getConfig("app.dataApiUrl")
);
app.start();