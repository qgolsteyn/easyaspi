import Boom from 'boom';
import debug from 'debug';
import express from 'express';

import { verifyAccessToken } from '@server/services/auth';
import { IUser } from '@shared/index';

const SUCCESS_CODE = 200;
const INTERNAL_CODE = 500;

const log = debug('route');
const err = debug('route:error');

const formatBoomPayload = (error: Boom<any>) => {
    return {
        ...error.output.payload,
        ...(error.data ? {} : { data: error.data }),
    };
};

export const enhanceHandler = (options: { protect: boolean }) => (
    handler: (req: express.Request, user?: IUser) => Promise<object>,
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

            res.status(SUCCESS_CODE);
            res.json(response);
        } catch (error) {
            if (Boom.isBoom(error)) {
                err(error);
                res.status(error.output.statusCode).send(
                    formatBoomPayload(error),
                );
            } else {
                err(error);
                res.status(INTERNAL_CODE).send(Boom.internal().output.payload);
            }
        }
        next();
    };
};
