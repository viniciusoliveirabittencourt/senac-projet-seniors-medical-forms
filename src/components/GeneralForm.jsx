import { Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ContactInformation from './ContactInformation';
import AddresInformation from './AddresInformation';

export default function GeneralForm ({ setGeneralForm, setGeneralValid, setGeneralInvalid, apiRes }) {
  const [contactInform, setContactInforma] = useState({});
  const [validContact, setValidContact] = useState(false);
  const [AddresInformationState, setAddresInformationState] = useState({});
  const [validAdd, setValidAdd] = useState(false);
  useEffect(() => {
    if (validAdd && validContact) {
      setGeneralValid();
    } else {
      setGeneralInvalid();
    }
  }, [validAdd, validContact]);

  useEffect(() => {
    setGeneralForm({
      contactInformation: contactInform,
      addresInformation: AddresInformationState,
    })
  }, [AddresInformationState, contactInform]);

  const setContact = (e) => {
    setContactInforma(e);
  };

  const setContactValid = () => {
    setValidContact(true);
  }

  const setContactInvalid = () => {
    setValidContact(false);
  }

  const setAddres = (e) => {
    setAddresInformationState(e);
  };

  const setAddresValid = () => {
    setValidAdd(true);
  }

  const setAddresInvalid = () => {
    setValidAdd(false);
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs lg="10">
          <h3>Informações de Contato -</h3>
        </Col>
      </Row>
      <ContactInformation apiRes={ apiRes.contactInformation } setContact={ setContact } setContactValid={ setContactValid } setContactInvalid={ setContactInvalid } />
      <Row className="justify-content-md-center">
        <Col xs lg="10">
          <h3>Informações de Endereço -</h3>
        </Col>
      </Row>
      <AddresInformation apiRes={ apiRes.addresInformation } setAddres={ setAddres } setAddresValid={ setAddresValid } setAddresInvalid={ setAddresInvalid } />
    </>
  );
}