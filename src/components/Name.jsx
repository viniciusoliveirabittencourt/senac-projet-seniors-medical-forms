import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function Name ({ nameHandler, setValidname, setInvalidname }) {
  const [name, setname] = useState('');
  const [nameValid, setnameValid] = useState(false);
  const nameLength = name.length < 8;

  useEffect(() => {
    if (!name || !nameLength) {
      setnameValid(true);
    } else {
      setnameValid(false);
    }
    nameHandler(name);
    nameLength && name ? setValidname() : setInvalidname();
  }, [name])

  return (
    <Form.Group className="mb-3" controlId="formBasicname">
      <Form.Label>Seu Nome:</Form.Label>
      <Form.Control onChange={ (e) => setname(e.target.value) } value={ name } type="text" placeholder="Nome" />
      <Form.Text className={ `${ nameValid ? 'displayNone' : '' } red` }>
        Nome precisa ter mais de 8 caracteres!
      </Form.Text>
    </Form.Group>
  )
}