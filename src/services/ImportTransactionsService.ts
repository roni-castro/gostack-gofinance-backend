import Transaction from '../models/Transaction';
import loadCSV from '../upload/csvLoader';
import { getFilePath, deleteFile } from '../upload/tmp-file-utils';
import CreateTransactionService from './CreateTransactionService';

interface CSVTransactionRequestDTO {
  title: string;
  value: number;
  type: string;
  category: string;
}

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService();
    const filePath = getFilePath(filename);
    const transactionsLoaded = await loadCSV(filePath);

    const transactionsToCreate = transactionsLoaded.map(transactionToCreate => {
      const { 0: title, 1: type, 2: value, 3: category } = transactionToCreate;
      return { title, type, value: +value, category };
    });

    const transactions: Transaction[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const transactionToCreate of transactionsToCreate) {
      const { title, type, value, category } = transactionToCreate;
      // eslint-disable-next-line no-await-in-loop
      const transaction = await createTransactionService.execute({
        title,
        type,
        value,
        categoryName: category,
      });
      transactions.push(transaction);
    }

    await deleteFile(filename);
    return transactions;
  }
}

export default ImportTransactionsService;
