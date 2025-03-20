import {Hono} from "hono";
import accounts from "./accounts.routes";
import adminAuth from "./admin-auth.routes";
import transactions from "./transactions.routes";

const v1 = new Hono();

// Authentication apis
v1.route('/admin/auth', adminAuth);

// Accounts apis
v1.route('/accounts', accounts);

// Transactions apis
v1.route('/accounts/:id', transactions);

export default v1;