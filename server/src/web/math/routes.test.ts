import express from 'express';
import { Server } from 'http';
import request from 'supertest';

import { initializeApp } from '../../server';
import mongoose from 'mongoose';

describe('math router', () => {
    let app: express.Application;
    let server: Server;

    beforeAll(async () => {
        [app, server] = await initializeApp();
    });

    it('should GET /math/templates', async () => {
        await request(app)
            .get('/math/templates')
            .expect(200);
    });

    // this endpoint needs to be further developed to add to document's array when it already exists
    // it('should POST /math/problem', async () => {
    //     await request(app)
    //         .post('/math/problem')
    //         .send({
    //             problemArchetype: 'arithmetic',
    //             problemType: 'addition',
    //             problem: '1+1=',
    //             solution: ['1+1=2'],
    //             difficulty: 10,
    //             seed: 10,
    //         })
    //         .expect(200);
    // });

    it('should GET /math/problem', async () => {
        await request(app)
            .get('/math/problem')
            .expect(200);
    });

    afterAll(async done => {
        await mongoose.disconnect();
        server.close(done);
    });
});
