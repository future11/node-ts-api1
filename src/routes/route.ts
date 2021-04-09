import { Router } from 'express';

import { PingController, PostController } from '../app/controllers';



export class Route {
    constructor() {

    }

    getRouter(): Router {
        const router = Router();

        router.get('/ping', PingController.ping);
        router.get('/posts', PostController.findPostsByTags);

        return router;
    }
}