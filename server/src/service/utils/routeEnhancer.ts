import Boom from 'boom';
import debug from 'debug';
import express from 'express';

import { verifyAccessToken } from '@server/service/authService';
import { IUser } from '@shared/index';

export const HTTP_CODE = {
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    NO_CONTENT: 204,
    OK: 200,
};

const log = debug('pi:route');
const err = debug('pi:route:error');

const formatBoomPayload = (error: Boom<unknown>) => {
    return {
        ...error.output.payload,
        ...(error.data ? {} : { data: error.data }),
    };
};

export const enhanceHandler = (options: { protect: boolean }) => (
    handler: (
        req: express.Request,
        user?: IUser,
    ) => Promise<[number, object | null]>,
) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {
            let user;

            log(`${req.method} ${req.url}`);
            log(req.headers);
            log(req.body);

            if (options.protect) {
                const token = req.headers.authorization
                    ? req.headers.authorization.replace('Bearer ', '')
                    : undefined;

                if (!token) {
                    throw Boom.unauthorized();
                }

                user = await verifyAccessToken(token);
            }

            log(user);

            const response = await handler(req, user);
            res.set(
                'Cache-Control',
                'no-store, no-cache, must-revalidate, private',
            );
            res.set('Expires', '0');

            log(response);

            if (response[1] !== null) {
                res.status(response[0]).json(response[1]);
            } else {
                res.status(response[0]).send('success');
            }
        } catch (error) {
            if (Boom.isBoom(error)) {
                err(error);
                res.status(error.output.statusCode).send(
                    formatBoomPayload(error),
                );
            } else {
                err(error);
                res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send(
                    Boom.internal().output.payload,
                );
            }
        }
        next();
    };
};
