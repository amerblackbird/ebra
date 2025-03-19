import {Hono} from "hono";
import accounts from "./accounts";

const v1 = new Hono();

v1.route('/accounts', accounts);

export default v1;