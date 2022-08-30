import { DeleteResult, UpdateResult } from 'mongodb';
import { Model, isValidObjectId } from "mongoose";
import IModel from "./interfaces/IModel";

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model
  }

  public async create(obj: T): Promise<T> {
      return this._model.create({ ...obj });
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.findById(_id);
  }

  public async updateOne(_id: string, obj: T): Promise<UpdateResult> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.updateOne({_id}, { ...obj });
  }

  public async deleteOne(_id: string): Promise<DeleteResult> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.deleteOne({ _id});
  }
}