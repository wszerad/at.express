import * as path from 'path';
import { Middleware } from '../classes/Middleware';
import { Error } from '../decorators/RequestParams.decorator';

export class ErrorMiddleware extends Middleware {
	use(@Error err, req, res) {
		const devMode = (process.env.MODE === 'dev');
		const status = err.status || 500;
		const message = err.message || 'Internal Error';
		const stack = devMode ? err.stack || null : null;
		const model = err.model || {};
		const errorDir = req.app.get('ERROR_DIR');

		if (req.xhr) {
			res.status(status)
				.send({
					message,
					model,
					status: 'error',
					stack
				});
		} else if (errorDir) {
			res.redirect(status, path.posix.join(errorDir, status));
		} else {
			res.end(message);
		}
	}
}