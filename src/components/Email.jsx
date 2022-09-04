import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function emailInput ({ emailHandler, setValidEmail, setInvalidEmail, value }) {
  const [email, setEmail] = useState(value ? value : '');
  const [emailValid, setEmailValid] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;
  const emailValidate = emailRegex.test(email);

  useEffect(() => {
    if (!email || emailValidate) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    emailHandler(email);
    emailValid && email ? setValidEmail() : setInvalidEmail();
  }, [email])

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Seu e-mail:</Form.Label>
      <Form.Control onChange={ (e) => setEmail(e.target.value) } value={ email } type="email" placeholder="E-mail" />
      <Form.Text className={ `${ emailValid ? 'displayNone' : '' } red` }>
        O E-mail precisa ser válido!
      </Form.Text>
    </Form.Group>
  )
}