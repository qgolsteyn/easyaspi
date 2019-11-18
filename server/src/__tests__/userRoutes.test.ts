import express from 'express';
import { Server } from 'http';
import request from 'supertest';
import { classRoomDoc4, user3 } from '../database/mockData';

import mongoose from 'mongoose';
import { initializeApp } from '../server';

describe('user router', () => {
    let app: express.Application;
    let server: Server;
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RlcmVkIjp0cnVlLCJzdWIiOiIx' +
        'MTgyNTk0MjY1MTk4OTUyNzI2NTYiLCJ1c2VyVHlwZSI6InN0dWRlbnQiLCJ2aXJ0dWFsQ2xhc3Nyb29tVWlkIj' +
        'oiNWRkMDg5NDEzMjQ5ODQzODA5M2FiOTMwIiwiaWF0IjoxNTc0MDExNzAxfQ.FRw087jFGP83DfjAbMDNV_CUYp7uIT7m0YnfrtzkJx8';

    beforeAll(async () => {
        [app, server] = await initializeApp();
    });

    it('should GET /user/current', async () => {
        const res = await request(app)
            .get('/user/current')
            .set('Authorization', token);

        // tslint:disable-next-line:no-magic-numbers
        expect(res.status).toBe(200);
    });

    it('should POST /user/register', async () => {
        const userPost = {
            classroom: classRoomDoc4,
            user: user3,
        };

        await request(app)
            .post('/user/register')
            .send(userPost)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', 'application/json; charset=utf-8')
            // tslint:disable-next-line:no-magic-numbers
            .expect(200);
    });

    afterAll(async done => {
        await mongoose.disconnect();
        server.close(done);
    });
});

