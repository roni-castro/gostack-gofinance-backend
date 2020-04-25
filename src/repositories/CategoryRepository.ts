import { EntityRepository, Repository } from 'typeorm';
import Category from '../models/Category';

@EntityRepository(Category)
export default class CategoriesRepository extends Repository<Category> {
  public async findCategoryByTitleOrCreate(title: string): Promise<Category> {
    const existingCategory = await this.findOne({ where: { title } });
    if (existingCategory) {
      return existingCategory;
    }
    const category = this.create({ title });
    const newCategoryCreated = await this.save(category);
    return newCategoryCreated;
  }
}
