import { Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Telephone from './Telephone';

export default function ContactInformation ({ setContact, setContactValid, setContactInvalid, apiRes }) {
  const [telephoneOne, setTelephoneOne] = useState(apiRes.telephoneOne);
  const [telephoneTwo, setTelephoneTwo] = useState(apiRes.telephoneTwo);
  const [telephoneValid, setTelephoneValid] = useState(false);

  useEffect(() => {
    setContact({
      telephoneOne,
      telephoneTwo,
    });
  }, [telephoneOne, telephoneTwo]);

  useEffect(() => {
    telephoneValid ? setContactValid() : setContactInvalid();
  }, [telephoneValid]);

  const telephoneOneHandler = (e) => {
    setTelephoneOne(e);
  };

  const telephoneTwoHandler = (e) => {
    setTelephoneTwo(e)
  };

  const validTelephone = () => {
    setTelephoneValid(true);
  };

  const invalidTelephone = () => {
    setTelephoneValid(false);
  }

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="5">
        <Form>
          <Telephone
            value={ apiRes.telephoneOne }
            required={ true }
            invalidTelephone={ invalidTelephone }
            validTelephone={ validTelephone }
            handlerTelephone={ telephoneOneHandler }
            telephone='Primário'
          />
        </Form>
      </Col>
      <Col xs lg="5">
        <Form>
          <Telephone
           value={ apiRes.telephoneTwo }
            required={ false }
            invalidTelephone={ invalidTelephone }
            validTelephone={ validTelephone }
            handlerTelephone={ telephoneTwoHandler }
            telephone='Secundário'
          />
        </Form>
      </Col>
    </Row>
  )
}