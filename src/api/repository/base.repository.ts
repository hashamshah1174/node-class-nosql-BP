import {
  DestroyOptions,
  FindOptions,
  FindOrCreateOptions,
  UpdateOptions,
  WhereOptions,
} from "sequelize";
import { ModelCtor } from "sequelize-typescript";

export abstract class BaseRepository<T> {
  public model: ModelCtor;

  constructor(model: ModelCtor) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const createdData = await this.model.create(data);

      return createdData as T;
    } catch (error) {
      throw Error("Error creating data: " + error);
    }
  }
  async bulkCreate(data: Partial<T>[]): Promise<T[]> {
    try {
      const createdData = await this.model.bulkCreate(data);

      return createdData as T[];
    } catch (error) {
      throw Error("Error creating data: " + error);
    }
  }

  async updateById(pkId: number, data: Partial<T>): Promise<T | null> {
    const [updatedRowsCount, updatedData] = await this.model.update(data, {
      where: { id: pkId },
      returning: true,
    });
    return updatedRowsCount > 0 ? (updatedData[0] as T) : null;
  }

  async updateOne(
    whereOption: WhereOptions<T>,
    data: Partial<T>
  ): Promise<T | null> {
    const [updatedRowsCount, updatedData] = await this.model.update(data, {
      where: whereOption,
      returning: true,
    });
    return updatedRowsCount > 0 ? (updatedData[0] as T) : null;
  }

  async update(options: UpdateOptions<T>, data: Partial<T>): Promise<T[]> {
    const [_, updatedData] = await this.model.update(data, {
      ...options,
      returning: true,
    });
    return (updatedData as T[]) || [];
  }

  async getById(pkId: number): Promise<T | null> {
    const data = await this.model.findByPk(pkId);
    return (data as T) || null;
  }

  async getOne(options?: FindOptions<T> | undefined): Promise<T | null> {
    const data = await this.model.findOne(options);
    return (data as T) || null;
  }

  async getAll(options?: FindOptions<T> | undefined): Promise<T[] | []> {
    const response = await this.model.findAll(options);
    return (response as T[]) || [];
  }

  async getAllWithCounts(
    options?: FindOptions<T> | undefined
  ): Promise<{ data: T[]; count: number }> {
    const { rows: data, count } = await this.model.findAndCountAll(options);
    return { data: (data as T[]) || [], count };
  }

  async trash(pkId: number): Promise<boolean> {
    const data = await this.model.destroy({ where: { id: pkId } });
    return data > 0;
  }

  async restore(pkId: number): Promise<boolean> {
    await this.model.restore({ where: { id: pkId } });
    return true;
  }

  async destroy(pkId: number): Promise<boolean> {
    const rowsDeleted = await this.model.destroy({
      where: { id: pkId },
      force: true,
    });
    console.log("rowsDeleted", rowsDeleted);
    return rowsDeleted > 0;
  }

  async destroyMany(option?: DestroyOptions<T>): Promise<boolean> {
    const rowsDeleted = await this.model.destroy(option);
    return rowsDeleted > 0;
  }

  async findOrCreate(
    findOrCreateOptions: FindOrCreateOptions
  ): Promise<T | null> {
    const transaction = await this.model.sequelize?.transaction()!; // Start a transaction

    try {
      const data = await this.model.findOrCreate({
        ...findOrCreateOptions,
        transaction, // Include the transaction in the findOrCreate options
      });

      await transaction.commit(); // Commit the transaction if successful

      return data ? (data[0].dataValues as T) : null;
    } catch (error) {
      await transaction.rollback(); // Rollback the transaction if there is an error
      throw Error("Error in finding or creating data:" + error);
    }
  }
}
