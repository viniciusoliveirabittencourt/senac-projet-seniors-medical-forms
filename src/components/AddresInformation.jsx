import { Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Country from './Country'
import State from './State';
import City from './City';
import Neiborhood from './Neiborhood';
import PublicPlace from './PublicPlace';
import Cep from './Cep';

export default function AddresInformation () {
  const [country, setCountry] = useState('');
  const [validCountry, setValidCountry] = useState(false);
  const [state, setState] = useState('');
  const [validState, setValidState] = useState(false);
  const [city, setCity] = useState('');
  const [validCity, setValidCity] = useState(false);
  const [neiborhood, setNeiborhood] = useState('');
  const [validNeiborhood, setValidNeiborhood] = useState(false);
  const [publicPlace, setPublicPlace] = useState('');
  const [validPublicPlace, setValidPublicPlace] = useState(false);
  const [cep, setCep] = useState('');
  const [validCep, setValidCep] = useState(false);

  console.log(cep);
  console.log(validCep);

  const countryHandler = (e) => {
    setCountry(e);
  };

  const validCountryFunc = () => {
    setValidCountry(true);
  }

  const invalidCountryFunc = () => {
    setValidCountry(false);
  }

  const stateHandler = (e) => {
    setState(e);
  };

  const validStateFunc = () => {
    setValidState(true);
  }

  const invalidStateFunc = () => {
    setValidState(false);
  }

  const cityHandler = (e) => {
    setCity(e);
  };

  const validCityFunc = () => {
    setValidCity(true);
  }

  const invalidCityFunc = () => {
    setValidCity(false);
  }

  const neiborhoodHandler = (e) => {
    setNeiborhood(e);
  };

  const validNeiborhoodFunc = () => {
    setValidNeiborhood(true);
  }

  const invalidNeiborhoodFunc = () => {
    setValidNeiborhood(false);
  }

  const publicPlaceHandler = (e) => {
    setPublicPlace(e);
  };

  const validPublicPlaceFunc = () => {
    setValidPublicPlace(true);
  }

  const invalidPublicPlaceFunc = () => {
    setValidPublicPlace(false);
  }

  const cepHandler = (e) => {
    setCep(e);
  };

  const validCepFunc = () => {
    setValidCep(true);
  }

  const invalidCepFunc = () => {
    setValidCep(false);
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <Country setInvalidcountry={ invalidCountryFunc } setValidcountry={ validCountryFunc } countryHandler={ countryHandler } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <State setInvalidstate={ invalidStateFunc } setValidstate={ validStateFunc } stateHandler={ stateHandler } />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <City setInvalidCity={ invalidCityFunc } setValidCity={ validCityFunc } CityHandler={ cityHandler } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <Neiborhood setInvalidneiborhood={ invalidNeiborhoodFunc } setValidneiborhood={ validNeiborhoodFunc } neiborhoodHandler={ neiborhoodHandler } />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <PublicPlace publicPlaceHandler={ publicPlaceHandler } setValidpublicPlace={ validPublicPlaceFunc } setInvalidpublicPlace={ invalidPublicPlaceFunc } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <Cep handlercep={ cepHandler } invalidcep={ validCepFunc } validcep={ invalidCepFunc } />
          </Form>
        </Col>
      </Row>
    </>
  );
};