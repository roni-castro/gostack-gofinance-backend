import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoryRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CreateTransactionRequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  categoryName: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryName,
  }: CreateTransactionRequestDTO): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getCustomRepository(CategoriesRepository);
    const balance = await transactionRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw new AppError(
        `You cant withdraw ${value} from your account. Its currently value is ${balance.total}`,
      );
    }
    const category = await categoryRepository.findCategoryByTitleOrCreate(
      categoryName,
    );
    const transaction: Transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: category.id,
    });
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
