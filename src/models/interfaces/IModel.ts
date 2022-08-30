import { DeleteResult, UpdateResult } from 'mongodb';

export default interface IModel<T> {
  create(obj: T): Promise<T>,
  readOne(_id: string): Promise<T | null>,
  updateOne(_id: string, obj: T): Promise<UpdateResult>,
  deleteOne(_id: string): Promise<DeleteResult>,
}