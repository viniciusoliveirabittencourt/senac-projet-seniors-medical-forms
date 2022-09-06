import { Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Name from './Name';
import Birthday from './Birthday';
import HealthPlan from './healthPlan';
import Gender from './Gender';
import Heigh from './Height';
import Weigth from './Weigth';
import BloodType from './BloodType';

export default function PersonalInformationInformation ({ setPersonalInformation, setPersonalInformationValid, apiRes }) {
  const [name, setName] = useState(apiRes.name);
  const [validName, setValidName] = useState(false);
  const [birthday, setBirthday] = useState(apiRes.birthday);
  const [birthdayValid, setBirthdayValid] = useState(false);
  const [healthPlan, setHealPlan] = useState(apiRes.healthPlan);
  const [validHealthPlan, setValidHealthPlan] = useState(false);
  const [gender, setGender] = useState(apiRes.gender);
  const [height, setHeight] = useState(apiRes.height);
  const [validHeight, setValidHeight] = useState(false);
  const [weigth, setWeigth] = useState(apiRes.weigth);
  const [validWeigth, setValidWeigth] = useState(false);
  const [bloodType, setBloodType] = useState(apiRes.bloodType);

  useEffect(() => {
    setPersonalInformation({
      name,
      birthday,
      healthPlan,
      gender,
      height,
      weigth,
      bloodType,
    });
  }, [name, birthday, healthPlan, gender, height, weigth, bloodType]);

  useEffect(() => {
    if (validName, birthdayValid, validHealthPlan, validHeight, validWeigth) {
      setPersonalInformationValid(true)
    } else {
      setPersonalInformationValid(false)
    }
  }, [validName, birthdayValid, validHealthPlan, validHeight, validWeigth])

  const nameHandler = (e) => {
    setName(e);
  };

  const setValidname = () => {
    setValidName(true);
  }

  const setInvalidname = () => {
    setValidName(false);
  };

  const validBirthday = (bool) => {
    setBirthdayValid(bool);
  }

  const handlerBirthday = (e) => {
    setBirthday(e);
  }

  const handlerHealth = (e) => {
    setHealPlan(e);
  }

  const validHealth = (bool) => {
    setValidHealthPlan(bool);
  }

  const setGenderFunc = (e) => {
    setGender(e);
  }

  const validHeigh = (bool) => {
    setValidHeight(bool);
  }

  const handlerHeigh = (e) => {
    setHeight(e);
  }

  const validWeigthFunc = (bool) => {
    setValidWeigth(bool);
  }

  const weigthFunc = (e) => {
    setWeigth(e);
  }

  const bloodTypeHandler = (e) => {
    setBloodType(e);
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <Name value={ apiRes.name } nameHandler={ nameHandler } setValidname={ setValidname } setInvalidname={ setInvalidname } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <Birthday handlerBirthday={ handlerBirthday } validBirthday={ validBirthday } value={ apiRes.birthday } />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <HealthPlan value={ apiRes.healthPlan } setValidHealpPlan={ validHealth } HealpPlanHandler={ handlerHealth } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <Gender value={ apiRes.gender } setGenderFunc={ setGenderFunc } />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <Heigh value={ apiRes.height } validHeigh={ validHeigh } handlerHeigh={ handlerHeigh } />
          </Form>
        </Col>
        <Col xs lg="5">
          <Form>
            <Weigth value={ apiRes.weigth } handlerWeigth={ weigthFunc } validWeigth={ validWeigthFunc } />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Form>
            <BloodType value={ apiRes.bloodType } setBloodTypeFunc={ bloodTypeHandler }  />
          </Form>
        </Col>
        <Col xs lg="5">
        </Col>
      </Row>
    </>
  )
};