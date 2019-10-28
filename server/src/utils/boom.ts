import Boom from 'boom';
import express from 'express';

const formatBoomPayload = (error: Boom<any>) => {
    return {
        ...error.output.payload,
        ...(error.data ? {} : { data: error.data }),
    };
};

export const enhanceHandler = (handler: express.RequestHandler) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const result = await handler(req, res, next);
            if (result instanceof Error && Boom.isBoom(result)) {
                res.status(result.output.statusCode).send(
                    formatBoomPayload(result)
                );
            }
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
