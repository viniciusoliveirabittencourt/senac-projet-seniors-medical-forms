import { Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ContactInformation from './ContactInformation';

export default function GeneralForm () {
  const [contactInform, setContactInforma] = useState();
  const [validemail, setValidEmail] = useState(false);

  const setContact = (e) => {
    setContactInforma(e);
  };

  const setEmailValid = () => {
    setValidEmail(true);
  }

  const setEmailInvalid = () => {
    setValidEmail(false);
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs lg="10">
          <h3>Informações de Contato -</h3>
        </Col>
      </Row>
      <ContactInformation setContact={ setContact } setEmailValid={ setEmailValid } setEmailInvalid={ setEmailInvalid } />
    </>
  );
}