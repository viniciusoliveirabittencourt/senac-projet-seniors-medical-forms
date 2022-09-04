import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

export default function Cep({ handlercep, invalidcep, validcep, value }) {
  const [cepState, setcepState] = useState(value);
  const cepValidate = cepState.length !== 9;

  useEffect(() => {
    handlercep(cepState);
    !cepValidate ? invalidcep() : validcep();
  }, [cepState]);

  return (
    <Form.Group className="mb-3">
      <Form.Label>CEP:</Form.Label>
      <Form.Control
        as={ IMaskInput }
        mask='00000-000'
        placeholder='CEP'
        value={ cepState }
        onChange={ (e) => setcepState(e.target.value) }
      />
      <Form.Text className={ `${ !cepValidate || !cepState ? 'displayNone' : '' } red` }>
        O CEP precisa ser válido!
      </Form.Text>
    </Form.Group>
  )
};