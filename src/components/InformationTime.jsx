import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function InformationNoTime({ placeHolder, index, setArray, deleteIndex, valueInfor, valueObs, valueHour }) {
  const [information, setInformation] = useState(valueInfor);
  const [observation, setObservation] = useState(valueObs);
  const [hour, setHour] = useState();

  useEffect(() => {
    setArray(index, {
      information,
      observation,
      hour,
    })
  }, [information, observation]);

  const deleteNode = (e) => {
    const parentNode = e.parentNode;
    const granpa = parentNode.parentNode
    granpa.remove();
    deleteIndex(index);
  }

  return (
    <Row className="justify-content-md-center mb-3">
      <Col xs lg="10">
        <Form>
          <Form.Control
            className='mb-2'
            value={ information }
            onChange={ (e) => setInformation(e.target.value) }
            type='text'
            placeHolder={ placeHolder }
          />
          <Form.Select className='mb-3' value={ hour } onChange={ (e) => setHour(e.target.value) }>
            <option value='00:00'>00:00</option>
            <option value='01:00'>01:00</option>
            <option value='02:00'>02:00</option>
            <option value='03:00'>03:00</option>
            <option value='04:00'>04:00</option>
            <option value='05:00'>05:00</option>
            <option value='06:00'>06:00</option>
            <option value='07:00'>07:00</option>
            <option value='08:00'>08:00</option>
            <option value='09:00'>09:00</option>
            <option value='10:00'>10:00</option>
            <option value='11:00'>11:00</option>
            <option value='12:00'>12:00</option>
            <option value='13:00'>13:00</option>
            <option value='14:00'>14:00</option>
            <option value='15:00'>15:00</option>
            <option value='16:00'>16:00</option>
            <option value='17:00'>17:00</option>
            <option value='18:00'>18:00</option>
            <option value='19:00'>19:00</option>
            <option value='20:00'>20:00</option>
            <option value='21:00'>00:00</option>
            <option value='22:00'>22:00</option>
            <option value='23:00'>23:00</option>
          </Form.Select>
          <Form.Control value={ observation } onChange={ (e) => setObservation(e.target.value) } type='text' placeHolder='Observações' />
        </Form>
      </Col>
      <Col>
        <Button variant='danger' onClick={ (e) => deleteNode(e.target) }>
          X
        </Button>
      </Col>
    </Row>
  );
}