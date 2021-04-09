import fetch from 'node-fetch';
import * as _ from 'lodash';

import { PostModel } from '../models';
import { CacheService } from './cache.service';



export class PostService {
    private dataApiUrl: String;
    private cacheService: CacheService;


    constructor(dataApiUrl: string) {
        this.dataApiUrl = dataApiUrl;
        this.cacheService = new CacheService();
    }

    /**
     * Get posts from data url api or memory cache.
     * @param tags - tags separated by comma
     * @param sortBy - sortBy field, it can be one of "id", "reads", "likes", "popularity"
     * @param direction - 'asc' or 'desc'
     * @returns - post array
     */
    async getPosts(
        tags: string,
        sortBy: string = "id",
        direction: string = "asc"
    ) {
        const arrTags = _.chain(tags.split(",")).uniq().sortBy().value(),
              cacheKey = "POSTS_TAGS_" + arrTags.join("_");

        // Get cached posts.
        let result = this.cacheService.get(cacheKey) as PostModel[];

        if (!result || result.length < 1) {
            result = [];

            for (let i = 0; i < arrTags.length; i ++) {
                const subResult = await fetch(this.dataApiUrl + "/blog/posts?tag=" + arrTags[i]);
                const subResultInJson = await subResult.json();
    
                result.push(...(subResultInJson.posts as PostModel[]));
            }

            // Cache the result.
            result = _.uniqBy(result, "id");
            this.cacheService.set(cacheKey, result);
        }

        // Sort the result in ascending order by 'sortBy'.
        result = _.sortBy(result, sortBy);

        // Reverse the array if direction is 'desc'.
        if (direction !== "asc")
            result.reverse();

        return result;
    }
}