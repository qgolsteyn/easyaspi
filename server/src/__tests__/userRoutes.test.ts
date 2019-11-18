import express from 'express';
import { Server } from 'http';
import request from 'supertest';
import { classRoomDoc4, user3 } from '../database/mockData';

import mongoose from 'mongoose';
import { initializeApp } from '../server';

describe('user router', () => {
    let app: express.Application;
    let server: Server;
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RlcmVkIjpmYWxzZSwic3ViIjoiMTA' +
        'zMDE1Mzc3MzgwNDQ3NDc3NjE1IiwiaWF0IjoxNTc0MTA1OTU3fQ.r_-mMFFRoCJTtcSjrv5QMqzVyHu_GfQKB_5J8MAaa9k';
    const timeout = 30000;

    beforeAll(async () => {
        // tslint:disable-next-line:no-magic-numbers
        jest.setTimeout(40000);
        [app, server] = await initializeApp();
    });

    it('should GET /user/current', async () => {
        const res = await request(app)
            .get('/user/current')
            .set('Authorization', token);

        // tslint:disable-next-line:no-magic-numbers
        expect(res.status).toBe(200);
    },timeout);

    it('should POST /user/register return 400', async () => {
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
            .expect(400);
    }, timeout);

    afterAll(async done => {
        await mongoose.disconnect();
        server.close(done);
    });
});

