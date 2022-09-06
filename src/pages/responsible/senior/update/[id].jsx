import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import GeneralForm from '../../../../components/GeneralForm';
import PersonalInformationInformation from '../../../../components/PersonalInformation';
import InformationArray from '../../../../components/InformationArray';
import axios from 'axios';

export default function createSenior() {
  const [user, setUser] = useState();
  const [button, setButton] = useState(true);
  const [generalForm, setGeneralForm] = useState({});
  const [validGeneralForm, setValidGeneralForm] = useState(false);
  const [personalInformation, setPersonalInformation] = useState()
  const [validPersonal, setValidPersonal] = useState(false);
  const [diagnoses, setDiagnoses] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [devices, setDevices] = useState([]);
  const [cirurgies, setCirurgies] = useState([]);
  const [medications, setMedication] = useState([]);
  const [diets, setDiet] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [pressureInjury, setPressureInjury] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const id = router.query.id;

  const getUser = async () => {
    try {
      const { data: message} = await axios.get('/api/getSenior', { headers: { id } });
      setUser(message.mySenior);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    if (user) {
      setPersonalInformation(user.personalInformation);
      setGeneralForm({ ...user.addresInformation, ...user.contactInformation});
      diagnosticosHandler(user.diagnoses);
      allergiesHandler(user.allergies);
      devicesHandler(user.devices);
      cirurgiesHandler(user.cirurgies);
      medicationHandler(user.medications);
      dietHandler(user.diets);
      vitalSignsHandler(user.vitalSigns);
      setPressureInjury(user.pressureInjury);
    }
  }, [user]);

  const diagnosticosHandler = (e) => {
    setDiagnoses([...e]);
  }

  const allergiesHandler = (e) => {
    setAllergies([...e]);
  }

  const devicesHandler = (e) => {
    setDevices([...e]);
  }

  const cirurgiesHandler = (e) => {
    setCirurgies([...e]);
  }

  const medicationHandler = (e) => {
    setMedication([...e]);
  }

  const dietHandler = (e) => {
    setDiet([...e]);
  }

  const vitalSignsHandler = (e) => {
    setVitalSigns([...e]);
  }

  const handleSubmit = async () => {
    try {
      setCarregando(true);
      const body = {
        _id: user._id,
        ...personalInformation,
        addresInformation: { ...generalForm.addresInformation },
        contactInformation: { ...generalForm.contactInformation },
        diagnoses,
        allergies,
        devices,
        cirurgies,
        medications,
        diets,
        vitalSigns,
        myResponsible: user.myResponsible,
        photo: user.photo,
      }
      console.log(body);
      await axios.put('/api/updateSenior', body, { headers: { 'Content-Type': 'application/json', id: user._id } });
      router.push(`/responsible/${user.myResponsible}`);
      setCarregando(false);
    } catch (e) {
      console.log(e);
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (
        validGeneralForm && !validPersonal
      ) {
        setButton(false);
      } else {
        setButton(true);
      }
  }, [validGeneralForm, validPersonal]);

  const setGeneralFormFunc = (e) => {
    setGeneralForm(e);
  }

  const validGeneralFormFunc = () => {
    setValidGeneralForm(true);
  }

  const invalidGeneralFormFunc = () => {
    setValidGeneralForm(false);
  }

  const setPersonalInformationFunc = (e) => {
    setPersonalInformation(e);
  }

  const validPersonalFunc = (bool) => {
    setValidPersonal(bool);
  }

  return (
    user ?
    <Container>
      <Row className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Form>
              <img src={ user.photo } className='photoUp my-3' />
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Form>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Informações Pessoais -</h3>
          </Col>
        </Row>
        <PersonalInformationInformation
          apiRes={{
            birthday: user.birthday,
            bloodType: user.bloodType,
            gender: user.gender,
            healthPlan: user.healthPlan,
            height: user.height,
            name: user.name,
            weigth: user.weigth,
          }}
          setPersonalInformationValid={ validPersonalFunc }
          setPersonalInformation={ setPersonalInformationFunc }
        />
        <GeneralForm setGeneralForm={ setGeneralFormFunc } setGeneralValid={ validGeneralFormFunc } setGeneralInvalid={ invalidGeneralFormFunc } apiRes={{ addresInformation: user.addresInformation, contactInformation: user.contactInformation }} />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Form>
              <Form.Group>
                <Form.Label>Lesão por pressão:</Form.Label>
                <Form.Select className='mb-3' value={ user.pressureInjury } onChange={ (e) => setPressureInjury(e.target.value) }>
                  <option value='0'>0</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Diagnosticos -</h3>
          </Col>
        </Row>
        <InformationArray handler={ diagnosticosHandler } time={ false } arr={ user.diagnoses } placeHolder={ 'Diagnostico' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Alergias -</h3>
          </Col>
        </Row>
        <InformationArray handler={ allergiesHandler } time={ false } arr={ user.allergies } placeHolder={ 'Alergia' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Dispositivos -</h3>
          </Col>
        </Row>
        <InformationArray handler={ devicesHandler } time={ false } arr={ user.devices } placeHolder={ 'Dispositivo' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Cirurgias Realizadas -</h3>
          </Col>
        </Row>
        <InformationArray  handler={ cirurgiesHandler } time={ false } arr={ user.cirurgies } placeHolder={ 'Cirurgia' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Medicamentos em uso -</h3>
          </Col>
        </Row>
        <InformationArray handler={ medicationHandler } time={ true } arr={ user.medications } placeHolder={ 'Medicamentos' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Dietas -</h3>
          </Col>
        </Row>
        <InformationArray handler={ dietHandler } time={ true } arr={ user.diets } placeHolder={ 'Alimentos' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Aferição dos sinais vitais -</h3>
          </Col>
        </Row>
        <InformationArray handler={ vitalSignsHandler } time={ true } arr={ user.vitalSigns } placeHolder={ 'Sinal Vital' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Button className='mb-5' onClick={ () => handleSubmit() } variant="primary" type="button">
                { carregando ? 'Carregando...' : 'Atualizar Informações' }
            </Button>
            <Link href={ `/responsible/${user.myResponsible}` }>
              <Button className='mx-5 mb-5' variant="success" type="button">
                  { '< Voltar' }
              </Button>
            </Link>
          </Col>
        </Row>
      </Row>
    </Container> : <h2>Carregando...</h2>
  )
}
