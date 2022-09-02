import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';

export default function Password ({ passwordHandler, setValidPassword, setInvalidPassword }) {
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [seePassword, setSeePassword] = useState('password');
  const [colorSeePass, setColorSeePass] = useState('');
  const passwordLength = password.length < 8;

  useEffect(() => {
    if (password && passwordLength) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
    passwordHandler(password);
    password && !passwordLength ? setValidPassword() : setInvalidPassword();
  }, [password]);

  const handlerPasswordSee = () => {
    if (seePassword === 'password') {
      setSeePassword('text');
      setColorSeePass('green');
    } else {
      setSeePassword('password');
      setColorSeePass('');
    }
  }

  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Sua senha:</Form.Label>
      <Form.Control onChange={ (e) => setPassword(e.target.value) } value={ password } type={ seePassword } placeholder="Senha" />
      <Form.Text className={ `${colorSeePass} onClick` } onClick={ () => handlerPasswordSee() }>Olhar Senha</Form.Text>
      < br/>
      <Form.Text className={ `${ passwordValid ? 'displayNone' : '' } red` }>A senha deve ter pelo menos 8 caracteres!</Form.Text>
    </Form.Group>
  );
};