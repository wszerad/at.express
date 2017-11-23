import * as chai from "chai";
import { app } from './test-server';

export function req(): ChaiHttp.Agent {
	return chai.request(app);
}