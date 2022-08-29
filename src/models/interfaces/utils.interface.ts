import { z } from 'zod';

const IAddresInformation = z.object({
  country: z.string({
    required_error: 'O campo "País" deve estar preenchido!',
    invalid_type_error: 'O campo "País" deve ser uma string!',
  })
    .min(3, { message: 'Não existe país com menos de 3 letras!' })
    .max(46, { message: 'Não existe país com mais de 46 letras!' }),
  state: z.string({
    required_error: 'O campo "Estado" deve estar preenchido!',
    invalid_type_error: 'O campo "Estado" deve ser uma string!',
  })
    .min(3, { message: 'Não existe estado com menos de 3 letras!' })
    .max(20, { message: 'Não existe estado com mais de 20 letras!' }),
  city: z.string({
    required_error: 'O campo "Cidade" deve estar preenchido!',
    invalid_type_error: 'O campo "Cidade" deve ser uma string!',
  })
    .min(3, { message: 'Não existe cidade com menos de 3 letras!' })
    .max(29, { message: 'Não existe cidade com mais de 29 letras!' }),
  neighborhood: z.string({
    required_error: 'O campo "Bairro" deve estar preenchido!',
    invalid_type_error: 'O campo "Bairro" deve ser uma string!',
  })
  .min(3, { message: 'Não existe Bairro com menos de 3 letras!' })
  .max(40, { message: 'Não existe cidade com mais de 40 letras!' }),
  publicPlace: z.string({
    required_error: 'O campo "Logradouro" deve estar preenchido!',
    invalid_type_error: 'O campo "Logradouro" deve ser uma string!',
  })
  .min(4, { message: 'Logradouro deve possuir mais de 4 letras!' }),
  complement: z.string(),
  cep: z.string({
    required_error: 'O campo "CEP" deve estar preenchido!',
    invalid_type_error: 'O campo "CEP" deve ser uma string!',
  }).length(9, 'CEP tem que ter exatamente 9 caracters!'),
});

const IContatcInformation = z.object({
  telephoneOne: z.string({
    required_error: 'O campo "Telefone Principal" deve estar preenchido!',
    invalid_type_error: 'O campo "Telefone Principal" deve ser uma string!',
  }).length(17, { message: 'O Telefone Principal deve ter 17 caracteres' }),
  telephoneTwo: z.string(),
});

const ISeniorsObjectInformationNoTime = z.object({
  medicationName: z.string({
    required_error: 'O campo "Medicamento" deve estar preenchido!',
    invalid_type_error: 'O campo "Medicamento" deve ser uma string!',
  }),
  observation: z.string(),
});

const ISeniorsObjectInformationTime = z.object({
  medicationName: z.string({
    required_error: 'O campo "Medicamento" deve estar preenchido!',
    invalid_type_error: 'O campo "Medicamento" deve ser uma string!',
  }),
  hour: z.number({
    required_error: 'O campo "Horário" deve estar preenchido!',
    invalid_type_error: 'O campo "Horário" deve ser um Number!',
  })
    .min(-1, { message: 'Horário não pode ser menor que -1!' })
    .max(23, { message: 'Horário não pode ser maior que 23!' }),
  observation: z.string(),
});

const ISeniorArrayInformationNoTime = z.array(ISeniorsObjectInformationNoTime);
const ISeniorArrayInformationTime = z.array(ISeniorsObjectInformationTime);

export {
  IAddresInformation,
  ISeniorArrayInformationNoTime,
  ISeniorArrayInformationTime,
  IContatcInformation,
};