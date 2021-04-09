import { PingResponseModel } from '../models';



export class PingService {
    constructor() {

    }

    getPingResponse() {
        const pingResponse = {
            success: true
        } as PingResponseModel;

        return pingResponse;
    }
}