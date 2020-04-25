import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import globalErrorHandler from '../middlewares/global-error-handler';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use(globalErrorHandler);

export default routes;
