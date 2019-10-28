import Boom from 'boom';
import express from 'express';

import { verifyAccessToken } from '@server/services/auth';

const formatBoomPayload = (error: Boom<any>) => {
    return {
        ...error.output.payload,
        ...(error.data ? {} : { data: error.data }),
    };
};

export const enhanceHandler = (options: { protect: boolean }) => (
    handler: (req: express.Request) => object
) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            let user;
            if (options.protect) {
                const token = req.headers.authorization
                    ? req.headers.authorization.replace('Bearer ', '')
                    : undefined;

                if (!token) {
                    throw Boom.unauthorized();
                }

                user = await verifyAccessToken(token);
            }

            (req as any).user = user;

            res.status(200);
            res.json(await handler(req));
        } catch (error) {
            if (Boom.isBoom(error)) {
                res.status(error.output.statusCode).send(
                    formatBoomPayload(error)
                );
            } else {
                console.error(error);
                res.status(500).send(Boom.internal().output.payload);
            }
        }
        next();
    };
};
