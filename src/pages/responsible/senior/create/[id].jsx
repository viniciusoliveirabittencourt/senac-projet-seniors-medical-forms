import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import GeneralForm from '../../../../components/GeneralForm';
import PersonalInformationInformation from '../../../../components/PersonalInformation';
import InformationArray from '../../../../components/InformationArray';
import axios from 'axios';

export default function CreateSenior() {
  const [button, setButton] = useState(true);
  const [generalForm, setGeneralForm] = useState({});
  const [validGeneralForm, setValidGeneralForm] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({})
  const [validPersonal, setValidPersonal] = useState(false);
  const [diagnoses, setDiagnoses] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [devices, setDevices] = useState([]);
  const [cirurgies, setCirurgies] = useState([]);
  const [medications, setMedication] = useState([]);
  const [diets, setDiet] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [pressureInjury, setPressureInjury] = useState(0);
  const [file, setFile] = useState();
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

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

  const createId = () => {
    const personalInformationReplace = personalInformation.birthday.replaceAll('/', '');
    return `${router.query.id}_${personalInformation.name}-${personalInformationReplace}`
  }

  const handleSubmit = async () => {
    try {
      setCarregando(true);
      const body = {
        _id: createId(),
        file,
        ...personalInformation,
        ...generalForm,
        diagnoses,
        allergies,
        devices,
        cirurgies,
        medications,
        diets,
        vitalSigns,
        pressureInjury,
        myResponsible: router.query.id,
      }
      const { data: { reqFileLocation } } = await axios.post('/api/createSenior', body, { headers: { 'Content-Type': 'multipart/form-data' } });
      delete body.file;
      body.photo = reqFileLocation;
      await axios.put('/api/updateSenior', body, { headers: { 'Content-Type': 'application/json', id: createId()} });
      router.push(`/responsible/${router.query.id}`);
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

  const setPersonalInformationFunc = (e) => {
    setPersonalInformation(e);
  }

  const validPersonalFunc = (bool) => {
    setValidPersonal(bool);
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
            name: '',
            birthday: '',
            healthPlan: '',
            gender: 'Não identificado',
            height: '',
            weigth: '',
            bloodType: 'Não identificado / Não deseja Transfusão',
          }}
          setPersonalInformationValid={ validPersonalFunc }
          setPersonalInformation={ setPersonalInformationFunc }
        />
        <GeneralForm setGeneralForm={ setGeneralFormFunc } setGeneralValid={ validGeneralFormFunc } setGeneralInvalid={ invalidGeneralFormFunc } apiRes={ resObj } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <Form>
              <Form.Group>
                <Form.Label>Lesão por pressão:</Form.Label>
                <Form.Select className='mb-3' value={ pressureInjury } onChange={ (e) => setPressureInjury(e.target.value) }>
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
        <InformationArray handler={ diagnosticosHandler } time={ false } arr={ diagnoses } placeHolder={ 'Diagnostico' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Alergias -</h3>
          </Col>
        </Row>
        <InformationArray handler={ allergiesHandler } time={ false } arr={ allergies } placeHolder={ 'Alergia' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Dispositivos -</h3>
          </Col>
        </Row>
        <InformationArray handler={ devicesHandler } time={ false } arr={ devices } placeHolder={ 'Dispositivo' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Cirurgias Realizadas -</h3>
          </Col>
        </Row>
        <InformationArray  handler={ cirurgiesHandler } time={ false } arr={ cirurgies } placeHolder={ 'Cirurgia' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Medicamentos em uso -</h3>
          </Col>
        </Row>
        <InformationArray handler={ medicationHandler } time={ true } arr={ medications } placeHolder={ 'Medicamentos' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Dietas -</h3>
          </Col>
        </Row>
        <InformationArray handler={ dietHandler } time={ true } arr={ diets } placeHolder={ 'Alimentos' } />
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h3>Aferição dos sinais vitais -</h3>
          </Col>
        </Row>
        <InformationArray handler={ vitalSignsHandler } time={ true } arr={ vitalSigns } placeHolder={ 'Sinal Vital' } />
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
            <Button className='mb-5' onClick={ () => handleSubmit() } disabled={ button } variant="primary" type="button">
                { carregando ? 'Carregando...' : 'Cadastrar' }
            </Button>
            <Link href={ `/responsible/${router.query.id}` }>
              <Button className='mx-5 mb-5' variant="success" type="button">
                  { '< Voltar' }
              </Button>
            </Link>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
