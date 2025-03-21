import {Hono} from "hono";
import {validateFormMiddleware} from "../middlewares/validate-form.middleware";
import {TransactionsController} from "../controllers/transactions.controller";
import {TransactionsService} from "../services/transactions.service";
import {AccountsService} from "../services/accounts.service";
import {WalletsService} from "../services/wallets.service";
import {createTransactionDtoSchema} from "../schemas/transactions.schema";
import {validatePathParamMiddleware} from "../middlewares/validate-path-param.middleware";
import {authMiddleware} from "../middlewares/auth-middleware";

const transactionsController = new TransactionsController(new TransactionsService(new AccountsService(), new WalletsService()));

const router = new Hono();

router.post('/top-up', authMiddleware, validatePathParamMiddleware("id"), validateFormMiddleware(createTransactionDtoSchema), async (c) => transactionsController.topUp(c));
router.post('/charge', authMiddleware, validatePathParamMiddleware("id"), validateFormMiddleware(createTransactionDtoSchema), async (c) => transactionsController.charge(c));

export default router;