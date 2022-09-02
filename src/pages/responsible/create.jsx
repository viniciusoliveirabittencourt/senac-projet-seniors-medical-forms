import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Email from '../../components/Email';
import Password from '../../components/Password';

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [button, setButton] = useState(true);

  const buttonHandler = () => {
    if (validEmail && validPassword) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    buttonHandler();
  }, [validEmail, validPassword]);

  const handlerEmail = (e) => {
    setEmail(e);
  };

  const setEmailValid = () => {
    setValidEmail(true);
  }

  const setEmaiInvalid = () => {
    setValidEmail(false);
  }

  const handlerPassword = (e) => {
    setPassword(e);
  };

  const setPasswordValid = () => {
    setValidPassword(true);
  }

  const setPasswordInvalid = () => {
    setValidPassword(false);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h1>Cadastre-se:</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <Form>
            <Email setInvalidEmail={ setEmaiInvalid } setValidEmail={ setEmailValid } emailHandler={ handlerEmail } />
            <Password setInvalidPassword={ setPasswordInvalid } setValidPassword={ setPasswordValid } passwordHandler={ handlerPassword } />
            </Form>
            <Button className='mb-3' disabled={ button } variant="primary" type="button">
              Logar
            </Button>
            <div>
              <p><Link href='/responsible/create'>Ainda não é cadastrado ? Cadastre-se</Link></p>
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
