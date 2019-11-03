import Boom from 'boom';
import debug from 'debug';
import express from 'express';

import { verifyAccessToken } from '@server/services/auth';
import { IUser } from '@shared/index';

export const CODE_OK = 200;
export const CODE_CREATED = 201;
export const CODE_INTERNAL = 500;

const log = debug('route');
const err = debug('route:error');

const formatBoomPayload = (error: Boom<unknown>) => {
    return {
        ...error.output.payload,
        ...(error.data ? {} : { data: error.data }),
    };
};

export const enhanceHandler = (options: { protect: boolean }) => (
    handler: (req: express.Request, user?: IUser) => Promise<[number, object]>,
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

            const response = await handler(req, user);

            log(response);

            res.status(response[0]);
            res.json(response[1]);
        } catch (error) {
            if (Boom.isBoom(error)) {
                err(error);
                res.status(error.output.statusCode).send(
                    formatBoomPayload(error),
                );
            } else {
                err(error);
                res.status(CODE_INTERNAL).send(Boom.internal().output.payload);
            }
        }
        next();
    };
};
