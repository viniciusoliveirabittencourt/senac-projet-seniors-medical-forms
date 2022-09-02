import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Email from '../../components/Email';
import Password from '../../components/Password';
import GeneralForm from '../../components/GeneralForm';
import Name from '../../components/Name'

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
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  const nameHandler = (e) => {
    setName(e);
  };

  const setValidname = () => {
    setValidName(true);
  };

  const setInvalidname = () => {
    setValidname(false);
  }

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
          <Col xs lg="10">
            <h1>Cadastre-se:</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Form>
              <Name setInvalidname={ setInvalidname } nameHandler={ nameHandler } setValidname={ setValidName } />
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Informações de Login -</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <Form>
              <Email setInvalidEmail={ setEmaiInvalid } setValidEmail={ setEmailValid } emailHandler={ handlerEmail } />
            </Form>
          </Col>
          <Col xs lg="5">
            <Form>
              <Password setInvalidPassword={ setPasswordInvalid } setValidPassword={ setPasswordValid } passwordHandler={ handlerPassword } />
            </Form>
          </Col>
        </Row>
        <GeneralForm />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Button className='mb-3' disabled={ button } variant="primary" type="button">
                Cadastrar
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
