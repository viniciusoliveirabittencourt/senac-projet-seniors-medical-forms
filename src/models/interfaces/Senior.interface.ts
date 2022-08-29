import { z } from 'zod';
import {
  IAddresInformation,
  IContatcInformation,
  ISeniorArrayInformationNoTime,
  ISeniorArrayInformationTime,
} from './utils.interface';

enum bloodTypeEnum {
  'A+',
  'B+',
  'AB+',
  'O+',
  'A-',
  'B-',
  'AB-',
  'O-',
  'Bombay',
  'RH Nulo',
}

const SeniorZodSchema = z.object({
  name: z.string({
    required_error: 'O campo "Nome" deve estar preenchido!',
    invalid_type_error: 'O campo "Nome" deve ser uma string!',
  }).min(8, { message: 'O campo "Nome" deve ter no mínimo 8 letras' }),
  birthday: z.string({
    required_error: 'O campo "Data de Nascimento" deve estar preenchido!',
    invalid_type_error: 'O campo "Data de Nascimento" deve ser uma string!',
  }).length(10, { message: 'O campo "Data de Nascimento" deve 10 caracteres' }),
  gender: z.number({
    required_error: 'O campo "Gênero" deve estar preenchido!',
    invalid_type_error: 'O campo "Gênero" deve ser um Number!',
  })
    .min(0, { message: 'Gênero não pode ter o value menor que 0!' })
    .max(3, { message: 'Gênero não pode ter o valor maior que 3!' }),
  height: z.string({
    required_error: 'O campo "Altura" deve estar preenchido!',
    invalid_type_error: 'O campo "Altura" deve ser uma string!',
  }).length(4, { message: 'O campo "Altura" deve 4 caracteres' }),
  weight: z.string({
    required_error: 'O campo "Peso" deve estar preenchido!',
    invalid_type_error: 'O campo "Peso" deve ser uma string!',
  }).length(5, { message: 'O campo "Peso" deve 5 caracteres' }),
  bloodType: z.nativeEnum(bloodTypeEnum),
  heatlCare: z.string({
    required_error: 'O campo "Plano de saúde" deve estar preenchido!',
    invalid_type_error: 'O campo "Plano de saúde" deve ser uma string!',
  }).min(3, { message: 'O campo "Plano de saúde" deve ter no mínimo 3 letras' }),
  contactInformation: IContatcInformation,
  addresInformation: IAddresInformation,
  pressureInjure: z.number({
    required_error: 'O campo "Pressure Injure" deve estar preenchido!',
    invalid_type_error: 'O campo "Pressure Injure" deve ser um Number!',
  })
    .min(0, { message: 'Pressure Injure não pode ter o value menor que 0!' })
    .max(4, { message: 'Pressure Injure não pode ter o valor maior que 4!' }),
  diagnoses: ISeniorArrayInformationNoTime,
  allergies: ISeniorArrayInformationNoTime,
  devices: ISeniorArrayInformationNoTime,
  cirurgies: ISeniorArrayInformationNoTime,
  medication: ISeniorArrayInformationTime,
  diets: ISeniorArrayInformationTime,
  vitalSigns: ISeniorArrayInformationTime,
  myResponsible: z.string(),
  photo: z.string(),
  comments: z.string(),
});

type ISenior = z.infer<typeof SeniorZodSchema>;

export default ISenior;
export { SeniorZodSchema };