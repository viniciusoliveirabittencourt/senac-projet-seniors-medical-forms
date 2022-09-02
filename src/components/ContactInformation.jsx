import { Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Telephone from './Telephone';

export default function ContactInformation ({ setContact, setEmailValid, setEmailInvalid }) {
  const [telephoneOne, setTelephoneOne] = useState('');
  const [telephoneTwo, setTelephoneTwo] = useState('');
  const [telephoneValid, setTelephoneValid] = useState(false);

  useEffect(() => {
    setContact({
      telephoneOne,
      telephoneTwo,
    });
    telephoneValid ? setEmailValid() : setEmailInvalid();
  }, [telephoneOne, telephoneTwo])

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