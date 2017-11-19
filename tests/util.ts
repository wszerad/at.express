import * as chai from "chai";
import { app } from './server.spec';

export function req(): ChaiHttp.Agent {
	return chai.request(app);
}