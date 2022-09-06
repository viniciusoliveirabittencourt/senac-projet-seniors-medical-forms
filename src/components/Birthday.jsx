import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

export default function Birthday({ handlerBirthday, validBirthday, value }) {
  const [BirthdayState, setBirthdayState] = useState(value);
  const BirthdayValidate = BirthdayState.length !== 10;

  useEffect(() => {
    handlerBirthday(BirthdayState);
    BirthdayValidate ? validBirthday(false) : validBirthday(true);
  }, [BirthdayState]);

  return (
    <Form.Group className="mb-3">
      <Form.Label>Data de Nascimento:</Form.Label>
      <Form.Control
        as={ IMaskInput }
        mask='00/00/0000'
        placeholder='Data de Nascimento'
        value={ BirthdayState }
        onChange={ (e) => setBirthdayState(e.target.value) }
      />
      <Form.Text className={ `${ !BirthdayValidate || !BirthdayState ? 'displayNone' : '' } red` }>
         Precisa ser uma data válida!
      </Form.Text>
    </Form.Group>
  )
};