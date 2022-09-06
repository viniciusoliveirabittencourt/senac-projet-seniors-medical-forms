import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

export default function Heigh({ handlerHeigh, validHeigh, value }) {
  const [HeighState, setHeighState] = useState(value);
  const HeighValidate = HeighState.length !== 4;

  useEffect(() => {
    handlerHeigh(HeighState);
    !HeighValidate ? validHeigh(false) : validHeigh(true);
  }, [HeighState]);

  return (
    <Form.Group className="mb-3">
      <Form.Label>Altura:</Form.Label>
      <Form.Control
        as={ IMaskInput }
        mask='0,00'
        placeholder='Altura'
        value={ HeighState }
        onChange={ (e) => setHeighState(e.target.value) }
      />
      <Form.Text className={ `${ !HeighValidate || !HeighState ? 'displayNone' : '' } red` }>
        A Altura precisa ser válido!
      </Form.Text>
    </Form.Group>
  )
};