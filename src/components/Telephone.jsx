import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

export default function Telephone({ telephone, handlerTelephone, invalidTelephone, validTelephone, required }) {
  const [telephoneState, setTelephoneState] = useState('');
  const telephoneValidate = telephoneState.length !== 16;

  useEffect(() => {
    handlerTelephone(telephoneState);
    if (required) {
      telephoneValidate ? invalidTelephone() : validTelephone();
    } else {
      !telephoneState || telephoneValidate ? invalidTelephone() : validTelephone();
    }
  }, [telephoneState]);

  return (
    <Form.Group className="mb-3">
      <Form.Label>{ `Telefone ${telephone}:` }</Form.Label>
      <Form.Control
        as={ IMaskInput }
        mask='(00) 9 0000-0000'
        placeholder='Telefone'
        value={ telephoneState }
        onChange={ (e) => setTelephoneState(e.target.value) }
      />
      <Form.Text className={ `${ !telephoneValidate || !telephoneState ? 'displayNone' : '' } red` }>
        O Telefone precisa ser válido!
      </Form.Text>
    </Form.Group>
  )
};