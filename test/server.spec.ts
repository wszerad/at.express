import * as express from 'express';
import { Arguments } from './arguments';
import { Async } from './async';
import { Methods } from './methods';

export const app = express();

app.use(require('body-parser').json());
Methods.router(app);
Async.router(app);
Arguments.router(app);

export const server = app.listen(3000);