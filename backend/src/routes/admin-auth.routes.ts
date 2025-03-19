import {Hono} from "hono";
import {validateFormMiddleware} from "../middlewares/validate-form.middleware";
import {AdminAuthController} from "../controllers/admin-auth.controller";
import {AdminAuthService} from "../services/admin-auth.service";
import {authSchema} from "../schemas/auth.schema";
import {AccountsService} from "../services/accounts.service";

const authController = new AdminAuthController(new AdminAuthService(new AccountsService()));

const router = new Hono();

router.post('', validateFormMiddleware(authSchema), async (c) => authController.authorize(c));

export default router;