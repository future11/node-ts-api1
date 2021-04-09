import { Request, Response } from 'express';

import {
    PostService,
    ValidationService
} from '../services';



export class PostController {
    static findPostsByTags = async (req: Request, res: Response) => {
        const tags = req.query.tags as string;
        const sortBy = req.query.sortBy as string || "id";
        const direction = req.query.direction as string || "asc";

        const postService = new PostService(req.dataApiUrl);
        const validationService = new ValidationService();

        if (!req.query.tags) {
            return res.status(400).send({
                error: "'tags' parameter is required"
            });
        } else if (!validationService.checkSortBy(sortBy)) {
            return res.status(400).send({
                error: "'sortBy' parameter is invalid"
            });
        } else if (!validationService.checkDirection(direction)) {
            return res.status(400).send({
                error: "'direction' parameter is invalid"
            });
        }

        postService.getPosts(tags, sortBy, direction)
            .then(posts => res.status(200).json(posts))
            .catch(err => res.status(500).send({
                status: 500,
                message: "Error occurred while fetching posts"
            }));
    };
}