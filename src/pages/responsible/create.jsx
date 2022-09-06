import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Email from '../../components/Email';
import Password from '../../components/Password';
import GeneralForm from '../../components/GeneralForm';
import Name from '../../components/Name'
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
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [generalForm, setGeneralForm] = useState({});
  const [validGeneralForm, setValidGeneralForm] = useState(false);
  const [file, setFile] = useState();
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setCarregando(true);
      const mySeniors = [];
      const body = {
        file,
        email,
        password,
        name,
        ...generalForm,
        mySeniors: []
      }
      await axios.post('/api/createResponsible', body, { headers: { 'Content-Type': 'multipart/form-data', 'cache': { maxAge: 2 * 60 * 100, exclude: { filter: req => getURLCached(req), query: false } } } });
      router.push('/')
      setCarregando(false);
    } catch (e) {
      console.log(e);
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (
        validEmail
        && validPassword
        && validName
        && validGeneralForm
      ) {
        setButton(false);
      } else {
        setButton(true);
      }
  }, [validEmail, validPassword, validName, validGeneralForm]);

  const resObj = {
    contactInformation: {
      telephoneOne: '',
      telephoneTwo: '',
    },
    addresInformation: {
      cep: '',
      city: '',
      country: '',
      neiborhood: '',
      publicPlace: '',
      state: '',
    }
  }

  const setGeneralFormFunc = (e) => {
    setGeneralForm(e);
  }

  const validGeneralFormFunc = () => {
    setValidGeneralForm(true);
  }

  const invalidGeneralFormFunc = () => {
    setValidGeneralForm(false);
  }

  const nameHandler = (e) => {
    setName(e);
  };

  const setValidname = () => {
    setValidName(true);
  };

  const setInvalidname = () => {
    setValidname(false);
  }

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
              <Name value={ '' } setInvalidname={ setInvalidname } nameHandler={ nameHandler } setValidname={ setValidName } />
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
              <Email value={ '' } setInvalidEmail={ setEmaiInvalid } setValidEmail={ setEmailValid } emailHandler={ handlerEmail } />
            </Form>
          </Col>
          <Col xs lg="5">
            <Form>
              <Password value={ '' } setInvalidPassword={ setPasswordInvalid } setValidPassword={ setPasswordValid } passwordHandler={ handlerPassword } />
            </Form>
          </Col>
        </Row>
        <GeneralForm setGeneralForm={ setGeneralFormFunc } setGeneralValid={ validGeneralFormFunc } setGeneralInvalid={ invalidGeneralFormFunc } apiRes={ resObj } />
          <Row className="justify-content-md-center">
            <Col xs lg="10">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Sua Foto:</Form.Label>
                  <Form.Control onChange={ (e) => setFile(e.target.files[0]) } type='file'/>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Button onClick={ () => handleSubmit() } disabled={ button } variant="primary" type="button">
                { carregando ? 'Carregando...' : 'Cadastrar' }
            </Button>
            <Link href='/'>
              <Button className='mx-5' variant="success" type="button">
                  { '< Voltar' }
              </Button>
            </Link>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
