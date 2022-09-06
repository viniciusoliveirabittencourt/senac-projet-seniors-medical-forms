import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Email from '../components/Email';
import Password from '../components/Password';
import axios from 'axios';

export async function getStaticProps() {
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
  const [carregando, setCarregando] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const router = useRouter();

  console.log(process.env.MONGO_URI);

  const buttonHandler = () => {
    if (validEmail && validPassword) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const requestSubmit = async () => {
    try {
      setCarregando(true);
      const body = {
        email,
        password
      }
      await axios.post('/api/login', body, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=9999' } });
      router.push(`/responsible/${email}`);
      setCarregando(false);
    } catch (e) {
      console.log(e);
      setServerMessage(e.response.data.message);
      setCarregando(false);
    }
  }

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
            <h1>Login:</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h3 className='red'>{ serverMessage }</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <Form>
            <Email setInvalidEmail={ setEmaiInvalid } setValidEmail={ setEmailValid } emailHandler={ handlerEmail } />
            <Password setInvalidPassword={ setPasswordInvalid } setValidPassword={ setPasswordValid } passwordHandler={ handlerPassword } />
            </Form>
            <Button onClick={ () => requestSubmit() } className='mb-3' disabled={ button } variant="primary" type="button">
              { carregando ? 'Carregando...' : 'Logar' }
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
