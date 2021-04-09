export class ValidationService {
    constructor() {

    }

    checkSortBy(sortBy: string) {
        return ["id", "reads", "likes", "popularity"].indexOf(sortBy) !== -1;
    }

    checkDirection(direction: string) {
        return ["asc", "desc"].indexOf(direction) !== -1;
    }
}