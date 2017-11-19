import * as express from 'express';
import { Arguments } from './cases/arguments';
import { Async } from './cases/async';
import { ConvertValidate } from './cases/convert&validate';
import { Errors } from './cases/errors';
import { Inheritance, InheritanceChild, InheritanceParent } from './cases/inheritance';
import { Methods } from './cases/methods';
import { MiddlewareController, MiddlewareExtended, MiddlewareNested } from './cases/middleware';
import { Nested1, Nested2 } from './cases/nested';
import { Services } from './cases/services';

export const app = express();

app.use(require('body-parser').json());
Methods.router(app);
Async.router(app);
Arguments.router(app);
Inheritance.router(app);
InheritanceChild.router(app);
InheritanceParent.router(app);
MiddlewareController.router(app);
MiddlewareNested.router(app);
MiddlewareExtended.router(app);
Services.router(app);
Nested1.router(app);
Nested2.router(app);
Errors.router(app);
ConvertValidate.router(app);

export const server = app.listen(3000);