import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

export default function Weigth({ handlerWeigth, validWeigth, value }) {
  const [WeigthState, setWeigthState] = useState(value);
  const WeigthValidate = WeigthState.length !== 5;

  useEffect(() => {
    handlerWeigth(WeigthState);
    !WeigthValidate ? validWeigth(false) : validWeigth(true);
  }, [WeigthState]);

  return (
    <Form.Group className="mb-3">
      <Form.Label>Peso:</Form.Label>
      <Form.Control
        as={ IMaskInput }
        mask='00,00'
        placeholder='Peso'
        value={ WeigthState }
        onChange={ (e) => setWeigthState(e.target.value) }
      />
      <Form.Text className={ `${ !WeigthValidate || !WeigthState ? 'displayNone' : '' } red` }>
        O Peso precisa ser válido!
      </Form.Text>
    </Form.Group>
  )
};