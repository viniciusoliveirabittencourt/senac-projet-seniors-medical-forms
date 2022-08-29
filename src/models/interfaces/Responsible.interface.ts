import { z } from 'zod';
import { IAddresInformation, IContatcInformation } from './utils.interface';

const ResponsiblleZodSchema = z.object({
  name: z.string({
    required_error: 'O campo "Nome" deve estar preenchido!',
    invalid_type_error: 'O campo "Nome" deve ser uma string!',
  }).min(8, { message: 'O campo "Nome" deve ter no mínimo 8 letras' }),
  email: z.string({
    required_error: 'O campo "E-mail" deve estar preenchido!',
    invalid_type_error: 'O campo "E-mail" deve ser uma string!',
  })
    .min(7, { message: 'O campo "E-mail" deve ser um e-mail válido!' })
    .email({ message: 'O campo "E-mail" deve ser um e-mail válido!' }),
  password: z.string({
    required_error: 'O campo "Senha" deve estar preenchido!',
    invalid_type_error: 'O campo "Senha" deve ser uma string!',
  }).min(8, { message: 'O campo "Senha" deve ter no mínimo 8 letras' }),
  contactInformation: IContatcInformation,
  addresInformation: IAddresInformation,
  myResponsibles: z.array(z.string()),
  photo: z.string(),
  comments: z.string(),
});

type IResponsible = z.infer<typeof ResponsiblleZodSchema>;

export default IResponsible;
export { ResponsiblleZodSchema };
