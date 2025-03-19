import {Hono} from "hono";
import {createUserSchemaDto} from "../schemas/usersSchema";
import {validateFormMiddleware} from "../middlewares/validateFormMiddleware";
import {AccountsController} from "../controllers/accounts";
import {AccountsService} from "../services/accounts";

const accountsController = new AccountsController(new AccountsService());

const router = new Hono();

router.post('', validateFormMiddleware(createUserSchemaDto), async (c) => accountsController.create(c));


export default router;