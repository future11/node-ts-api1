import supertest from 'supertest';

import { app } from '../../src';


describe("GET /api/ping", () => {
    it("Ping Request", async () => {
        const result = await supertest(app.getExpressApp()).get("/api/ping");
        expect(result.body.success).toEqual(true);
        expect(result.status).toEqual(200);
    });
});

describe("GET /api/posts", () => {
    it("Posts Request", async () => {
        const result = await supertest(app.getExpressApp()).get("/api/posts?tags=science");
        expect(result.status).toEqual(200);
    });

    it("Tags parameter is required", async () => {
        const result = await supertest(app.getExpressApp()).get("/api/posts");
        expect(result.status).toEqual(400);
    });

    it("sortBy parameter is invalid", async () => {
        const result = await supertest(app.getExpressApp()).get("/api/posts?tags=science,health&sortBy=id1");
        expect(result.status).toEqual(400);
    });

    it("direction parameter is invalid", async () => {
        const result = await supertest(app.getExpressApp()).get("/api/posts?tags=science,health&sortBy=id&direction=asd");
        expect(result.status).toEqual(400);
    });
});