import { Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Country from './Country'
import State from './State';
import City from './City';
import Neiborhood from './Neiborhood';
import PublicPlace from './PublicPlace';
import Cep from './Cep';

export default function AddresInformation ({ setAddres, setAddresValid, setAddresInvalid, apiRes }) {
  const [country, setCountry] = useState(apiRes.country);
  const [validCountry, setValidCountry] = useState(false);
  const [state, setState] = useState(apiRes.state);
  const [validState, setValidState] = useState(false);
  const [city, setCity] = useState(apiRes.city);
  const [validCity, setValidCity] = useState(false);
  const [neiborhood, setNeiborhood] = useState(apiRes.neiborhood);
  const [validNeiborhood, setValidNeiborhood] = useState(false);
  const [publicPlace, setPublicPlace] = useState(apiRes.publicPlace);
  const [validPublicPlace, setValidPublicPlace] = useState(false);
  const [cep, setCep] = useState(apiRes.state);
  const [validCep, setValidCep] = useState(false);

  useEffect(() => {
    setAddres({
      country,
      state,
      city,
      neiborhood,
      publicPlace,
      cep,
    });
  }, [country, state, city, neiborhood, publicPlace, cep]);

  useEffect(() => {
    if (
      validCountry
      && validState
      && validCity
      && validNeiborhood
      && validPublicPlace
      && validCep
    ) {
      setAddresValid();
    } else {
      setAddresInvalid();
    }
  }, [validCountry, validState, validCity, validNeiborhood, validPublicPlace, validCep]);

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
            <Country value={ apiRes.country } setInvalidcountry={ invalidCountryFunc } setValidcountry={ validCountryFunc } countryHandler={ countryHandler } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <State value={ apiRes.state } setInvalidstate={ invalidStateFunc } setValidstate={ validStateFunc } stateHandler={ stateHandler } />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <City value={ apiRes.city } setInvalidCity={ invalidCityFunc } setValidCity={ validCityFunc } CityHandler={ cityHandler } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <Neiborhood value={ apiRes.neiborhood } setInvalidneiborhood={ invalidNeiborhoodFunc } setValidneiborhood={ validNeiborhoodFunc } neiborhoodHandler={ neiborhoodHandler } />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <PublicPlace value={ apiRes.publicPlace } publicPlaceHandler={ publicPlaceHandler } setValidpublicPlace={ validPublicPlaceFunc } setInvalidpublicPlace={ invalidPublicPlaceFunc } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <Cep value={ apiRes.cep } handlercep={ cepHandler } invalidcep={ validCepFunc } validcep={ invalidCepFunc } />
          </Form>
        </Col>
      </Row>
    </>
  );
};