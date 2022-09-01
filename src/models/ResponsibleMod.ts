import { model as mongooseCreateModel, Schema } from "mongoose";
import IResponsible from "./interfaces/Responsible.interface";
import MongoModel from "./MongoModel";

const responsibleSchema = new Schema<IResponsible>(
  {
    name: String,
    email: String,
    password: String,
    contactInformation: Object,
    addresInformation: Object,
    myResponsibles: Array,
    photo: String,
    comments: String,
  },
  { versionKey: false }
);

export default class ResponsibleMod extends MongoModel<IResponsible> {
  constructor(model = mongooseCreateModel('Responsible', responsibleSchema)) {
    super(model);
  }
};
