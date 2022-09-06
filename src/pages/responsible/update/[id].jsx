import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Email from '../../../components/Email';
import Password from '../../../components/Password';
import GeneralForm from '../../../components/GeneralForm';
import Name from '../../../components/Name'
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [button, setButton] = useState(true);
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [generalForm, setGeneralForm] = useState({});
  const [validGeneralForm, setValidGeneralForm] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  console.log(user);

  const getUser = async () => {
    try {
      const body = {
        email: router.query.id
      }
      const { data: message } = await axios.post('/api/getUserInfo', body, { headers: { 'Content-Type': 'application/json' } });
      setUser(message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  const handleSubmit = async () => {
    try {
      setCarregando(true);
      const body = {
        photo: user.message.photo,
        email,
        password,
        name,
        'contactInformation.telephoneOne': generalForm.contactInformation.telephoneOne,
        'contactInformation.telephoneTwo': generalForm.contactInformation.telephoneTwo,
        'addresInformation.cep': generalForm.addresInformation.cep,
        'addresInformation.country': generalForm.addresInformation.country,
        'addresInformation.city': generalForm.addresInformation.city,
        'addresInformation.neiborhood': generalForm.addresInformation.neiborhood,
        'addresInformation.publicPlace': generalForm.addresInformation.publicPlace,
        'addresInformation.state': generalForm.addresInformation.state,
        mySeniors: user.message.mySeniors,
      }
      await axios.put('/api/updateUser', body, { headers: { 'Content-Type': 'application/json', id: router.query.id } });
      router.push(`/responsible/${router.query.id}`)
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
    user ?
    <Container>
      <Row className="justify-content-md-center">
      <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Form>
              <img src={ user.message.photo } className='photoUp my-3' />
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Form>
              <Name value={ user.message.name } setInvalidname={ setInvalidname } nameHandler={ nameHandler } setValidname={ setValidName } />
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
              <Email value={ user.message.email } setInvalidEmail={ setEmaiInvalid } setValidEmail={ setEmailValid } emailHandler={ handlerEmail } />
            </Form>
          </Col>
          <Col xs lg="5">
            <Form>
              <Password value={ user.message.password } setInvalidPassword={ setPasswordInvalid } setValidPassword={ setPasswordValid } passwordHandler={ handlerPassword } />
            </Form>
          </Col>
        </Row>
        <GeneralForm
          setGeneralForm={ setGeneralFormFunc }
          setGeneralValid={ validGeneralFormFunc }
          setGeneralInvalid={ invalidGeneralFormFunc }
          apiRes={{
            contactInformation: {
              telephoneOne: user.message['contactInformation.telephoneOne'],
              telephoneTwo: user.message['contactInformation.telephoneTwo'],
            },
            addresInformation: {
              cep: user.message['addresInformation.cep'],
              city: user.message['addresInformation.city'],
              country: user.message['addresInformation.country'],
              neiborhood: user.message['addresInformation.neiborhood'],
              publicPlace: user.message['addresInformation.publicPlace'],
              state: user.message['addresInformation.state'],
            }
          }}
        />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Button onClick={ () => handleSubmit() } variant="primary" type="button">
                { carregando ? 'Carregando...' : 'Atualizar Informações' }
            </Button>
            <Link href={`/responsible/${router.query.id}`}>
              <Button className='mx-5' variant="success" type="button">
                  { '< Voltar' }
              </Button>
            </Link>
          </Col>
        </Row>
      </Row>
    </Container> : <h1>Carregando...</h1>
  )
}
