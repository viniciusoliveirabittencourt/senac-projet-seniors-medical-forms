import { model as mongooseCreateModel, Schema } from 'mongoose';
import ISenior from './interfaces/Senior.interface';
import MongoModel from './MongoModel';

const senioSchema = new Schema<ISenior> (
  {
    name: String,
    birthday: String,
    gender: String,
    height: String,
    weight: String,
    bloodType: String,
    heatlCare: String,
    contactInformation: Object,
    addresInformation: Object,
    pressureInjure: Number,
    diagnoses: Array,
    allergies: Array,
    devices: Array,
    cirurgies: Array,
    medication: Array,
    diets: Array,
    vitalSigns: Array,
    myResponsible: Array,
    photo: String,
    comments: String,
  },
  { versionKey: false }
);

export default class SeniorMod extends MongoModel<ISenior> {
  constructor (model = mongooseCreateModel('Senior', senioSchema)) {
    super(model);
  }
};
