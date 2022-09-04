import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function State ({ stateHandler, setValidstate, setInvalidstate, value }) {
  const [state, setstate] = useState(value);
  const [stateValid, setstateValid] = useState(false);
  const stateLength = state.length < 3 || state.length > 20;
  useEffect(() => {
    if (!state || !stateLength) {
      setstateValid(true);
    } else {
      setstateValid(false);
    }
    stateHandler(state);
    !stateLength && state ? setValidstate() : setInvalidstate();
  }, [state])

  return (
    <Form.Group className="mb-3" controlId="formBasicstate">
      <Form.Label>Estado:</Form.Label>
      <Form.Control onChange={ (e) => setstate(e.target.value) } value={ state } type="text" placeholder="Estado" />
      <Form.Text className={ `${ stateValid ? 'displayNone' : '' } red` }>
        Não existe estado com menos de 3 letras e com mais de 20 letras!
      </Form.Text>
    </Form.Group>
  )
}