import express from 'express';
import request from 'supertest';

import { initializeApp } from '../server';
import mongoose from 'mongoose';

describe('math router', () => {
    let app: express.Application;
    beforeAll(async () => {
        app = await initializeApp();
    });

    it('should GET /math/templates', async () => {
        await request(app)
            .get('/math/templates')
            .expect(200);
    });

    it('should POST /math/template', async () => {
        await request(app)
            .post('/math/template')
            .send({
                problemArchetype: 'arithmetic',
                problemType: 'addition',
                operators: ['+'],
            })
            .expect(200);
    });

    it('should POST /math/problem', async () => {
        await request(app)
            .post('/math/problem')
            .send({
                problemArchetype: 'arithmetic',
                problemType: 'addition',
                problem: '1+1=',
                solution: ['1+1=2'],
                difficulty: 10,
                seed: 10,
            })
            .expect(200);
    });

    it('should GET /math/problem', async () => {
        await request(app)
            .get('/math/problem')
            .expect(200);
    });

    afterAll(done => {
        mongoose.disconnect(done);
    });
});
