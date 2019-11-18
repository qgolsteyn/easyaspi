import express from 'express';
import { Server } from 'http';
import request from 'supertest';

import mongoose from 'mongoose';
import { initializeApp } from '../server';

describe('math router', () => {
    let app: express.Application;
    let server: Server;
    const token =  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RlcmVkIjpmYWxzZSwic3ViIjoiMTAzMDE1Mzc3MzgwNDQ3' +
        'NDc3NjE1IiwiaWF0IjoxNTc0MTA1OTU3fQ.r_-mMFFRoCJTtcSjrv5QMqzVyHu_GfQKB_5J8MAaa9k';
    const timeout = 30000;

    beforeAll(async () => {
        // tslint:disable-next-line:no-magic-numbers
        jest.setTimeout(40000);
        [app, server] = await initializeApp()
    });

    it('should GET /math/templates', async () => {
        const res = await request(app)
            .get('/math/templates')
            .set('Authorization', token);

        // tslint:disable-next-line:no-magic-numbers
        expect(res.status).toBe(200);
    }, timeout);

    it('should GET /math/nextProblem', async () => {
        const res = await request(app)
            .get('/math/nextProblem')
            .set('Authorization', token);

        // tslint:disable-next-line:no-magic-numbers
        expect(res.status).toBe(200);
    }, timeout);

    afterAll(async done => {
        await mongoose.disconnect();
        server.close(done);
    });
});
