import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";

export default function Senior () {
  const [user, setUser] = useState();
  console.log(user);
  const [responsible, setResponsible] = useState();
  const router = useRouter();

  const getUser = async () => {
    try {
      const { data: message} = await axios.get('/api/getSenior', { headers: { id: router.query.id } });
      setUser(message.mySenior);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return
    } else {
      getUser();
    }
  }, [router.isReady]);

  const getResponsible = async () => {
    try {
      const body = {
        email: user.myResponsible,
      }
      const { data } = await axios.post('/api/getUserInfo', body, { headers: { 'Content-Type': 'application/json' } });
      setResponsible(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      getResponsible();
    }
  }, [user]);

  const getAge = () => {
    let finalAge = 0;
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay();
    const arrayNumer = user.birthday.split('/');

    finalAge = Number(arrayNumer[2]) - year;
    if (month < Number(arrayNumer[1])) {
      finalAge - 1;
    } else if (month === Number(arrayNumer[2])) {
      if (day < Number(arrayNumer[0])) {
        finalAge - 1;
      }
    }

    return finalAge;
  }

  const createArr = (arr, message, label) => {
    if (arr.length <= 0) {
      return <p>{ message }</p>
    }

    return arr.map((i, j) => <Col key={ j } className="line" xs lg="5">
        <h6>{ label }:</h6>
        <p>{ i.information }</p>
        <h6>Observação:</h6>
        <p>{ i.observation }</p>
      </Col>);
  };

  const createArrTime = (arr, message, label) => {
    if (arr.length <= 0) {
      return <p>{ message }</p>
    }

    return arr.map((i, j) => <Col key={ j } className="line" xs lg="5">
        <h6>{ label }:</h6>
        <p>{ i.information }</p>
        <h6>Horário:</h6>
        <p>{ i.hour }</p>
        <h6>Observação:</h6>
        <p>{ i.observation }</p>
      </Col>);
  };

  return (
    responsible ?
    <Container>
      <Row className="justify-content-md-center line">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <img src={ responsible.photo } className='photoUp my-3' />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h1>Responsável -</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Nome:</h4>
            <p>{ responsible.name }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h2>Informações de contato -</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Telefone Principal:</h4>
            <p>{ responsible['contactInformation.telephoneOne'] }</p>
          </Col>
          <Col xs lg="5">
            <h4>Telefone Secundário:</h4>
            <p>{ responsible['contactInformation.telephoneOne'] ? responsible['contactInformation.telephoneOne'] : 'Não possuí segundo telefone.' }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h2>Informações de Endereço -</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Cidade:</h4>
            <p>{ responsible['addresInformation.city'] }</p>
          </Col>
          <Col xs lg="5">
            <h4>Bairro:</h4>
            <p>{ responsible['addresInformation.neiborhood'] }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Logradouro:</h4>
            <p>{ responsible['addresInformation.publicPlace'] }</p>
          </Col>
          <Col xs lg="5">
            <h4>Estado:</h4>
            <p>{ responsible['addresInformation.state'] }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>País:</h4>
            <p>{ responsible['addresInformation.country'] }</p>
          </Col>
          <Col xs lg="5">
            <h4>CEP:</h4>
            <p>{ responsible['addresInformation.cep'] }</p>
          </Col>
        </Row>
      </Row>
      <Row className="justify-content-md-center line">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <img src={ user.photo } className='photoUp my-3' />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h2>Informações Pessoais -</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Nome:</h4>
            <p>{ user.name }</p>
          </Col>
          <Col xs lg="5">
            <h4>Idade:</h4>
            <p>{ getAge() }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Data de Nascimento:</h4>
            <p>{ user.birthday }</p>
          </Col>
          <Col xs lg="5">
            <h4>Gênero:</h4>
            <p>{ user.gender }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Tipo sanguíneo:</h4>
            <p>{ user.bloodType }</p>
          </Col>
          <Col xs lg="5">
            <h4>Plano de saúde:</h4>
            <p>{ user.healthPlan }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Altura:</h4>
            <p>{ user.height }</p>
          </Col>
          <Col xs lg="5">
            <h4>Peso:</h4>
            <p>{ user.weigth }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h2>Informações de contato -</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Telefone Primario:</h4>
            <p>{ user.contactInformation.telephoneOne }</p>
          </Col>
          <Col xs lg="5">
            <h4>Telefone Secundário:</h4>
            <p>{ user.contactInformation.telephoneTwo }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h2>Informações de endereço -</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Cidade:</h4>
            <p>{ user.addresInformation.city }</p>
          </Col>
          <Col xs lg="5">
            <h4>Bairro:</h4>
            <p>{ user.addresInformation.neiborhood }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>Logradouro:</h4>
            <p>{ user.addresInformation.publicPlace }</p>
          </Col>
          <Col xs lg="5">
            <h4>Estado:</h4>
            <p>{ user.addresInformation.state }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h4>País:</h4>
            <p>{ user.addresInformation.country }</p>
          </Col>
          <Col xs lg="5">
            <h4>CEP:</h4>
            <p>{ user.addresInformation.cep }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h2>Informações médicas -</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Lesão por pressão:</h4>
            <p>{ user.pressureInjure }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Diagnosticos:</h4>
            <p>{ createArr(user.diagnoses, 'Este pacienten não possuí diagnosticos.', 'Diagnostico') }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Alergias:</h4>
            <p>{ createArr(user.allergies, 'Este pacienten não possuí alergias.', 'Alergia') }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Cirurgias:</h4>
            <p>{ createArr(user.cirurgies, 'Este pacienten não possuí cirurgias.', 'Cirurgia') }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Dispositivos:</h4>
            <p>{ createArr(user.devices, 'Este pacienten não possuí dispositivos.', 'Dispositivo') }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Medicações:</h4>
            <p>{ createArrTime(user.medications, 'Este pacienten não toma medicações no momentos.', 'Medicamento') }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Aferição de sinais vitais:</h4>
            <p>{ createArrTime(user.vitalSigns, 'Este pacienten não afere seus sinais vitais no momentos.', 'Sinal Vital') }</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <h4>Dietas:</h4>
            <p>{ createArrTime(user.diets, 'Este pacienten não tem faz dietas no momentos.', 'Alimento') }</p>
          </Col>
        </Row>
      </Row>
    </Container> : <h1>Carregando...</h1>
  );
}