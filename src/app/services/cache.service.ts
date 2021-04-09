import * as mcache from 'memory-cache';



export class CacheService {
    constructor() {

    }

    set(key: string, value: any) {
        mcache.put(key, value);
    }

    get(key: string) {
        return mcache.get(key);
    }
}