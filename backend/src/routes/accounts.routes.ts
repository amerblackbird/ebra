import {Hono} from "hono";
import {createUserSchemaDto} from "../schemas/users.schema";
import {validateFormMiddleware} from "../middlewares/validate-form.middleware";
import {AccountsController} from "../controllers/accounts.controller";
import {AccountsService} from "../services/accounts.service";

const accountsController = new AccountsController(new AccountsService());

const router = new Hono();

router.post('', validateFormMiddleware(createUserSchemaDto), async (c) => accountsController.create(c));


export default router;