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

    afterAll(async done => {
        await mongoose.disconnect();
        server.close(done);
    });
});
