import { ITemplate, IProblem } from '../model';

export interface MathAPI {
    '/templates': {
        GET: {
            body: {};
            response: ITemplate[];
        };
    };
    '/template': {
        POST: {
            body: ITemplate;
            response: void;
        };
    };
    '/problem': {
        GET: {
            body: {};
            response: IProblem[];
        };
        POST: {
            body: IProblem;
            response: void;
        };
    };
}
