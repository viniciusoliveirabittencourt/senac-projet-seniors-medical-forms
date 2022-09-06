import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function InformationNoTime({ placeHolder, index, setArray, deleteIndex, label, valueInfor, valueObs }) {
  const [information, setInformation] = useState(valueInfor);
  const [observation, setObservation] = useState(valueObs);

  useEffect(() => {
    setArray(index, {
      information,
      observation,
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
          <Form.Control className='mb-2' value={ information } onChange={ (e) => setInformation(e.target.value) } type='text' placeHolder={ placeHolder } />
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