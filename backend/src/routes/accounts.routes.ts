import {Hono} from "hono";
import {createUserSchemaDto} from "../schemas/users.schema";
import {validateFormMiddleware} from "../middlewares/validate-form.middleware";
import {AccountsController} from "../controllers/accounts.controller";
import {AccountsService} from "../services/accounts.service";
import {authMiddleware} from "../middlewares/auth-middleware";

const accountsController = new AccountsController(new AccountsService());

const router = new Hono();

router.post('', authMiddleware, validateFormMiddleware(createUserSchemaDto), async (c) => accountsController.create(c));


export default router;