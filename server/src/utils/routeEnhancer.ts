import Boom from 'boom';
import express from 'express';

import { verifyAccessToken } from '@server/services/auth';
import { IUser } from '@shared/index';

const formatBoomPayload = (error: Boom<any>) => {
    return {
        ...error.output.payload,
        ...(error.data ? {} : { data: error.data }),
    };
};

export const enhanceHandler = (options: { protect: boolean }) => (
    handler: (req: express.Request, user?: IUser) => Promise<object>
) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            let user;

            console.log(req.url);

            if (options.protect) {
                const token = req.headers.authorization
                    ? req.headers.authorization.replace('Bearer ', '')
                    : undefined;

                if (!token) {
                    throw Boom.unauthorized();
                }

                user = await verifyAccessToken(token);
            }

            console.log(JSON.stringify(req.body, null, 2));

            const response = await handler(req, user);

            console.log(JSON.stringify(response, null, 2));

            res.status(200);
            res.json(response);
        } catch (error) {
            if (Boom.isBoom(error)) {
                console.error(error);
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
