import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function bloodType({ value, setBloodTypeFunc }) {
  const [bloodType, setBloodType] = useState(value);

  useEffect(() => {
    setBloodTypeFunc(bloodType);
  }, [bloodType])

  return (
    <Form.Group className="mb-3" controlId="formBasicHealpPlan">
      <Form.Label>Gênero:</Form.Label>
      <Form.Select value={ bloodType } onChange={ (e) => setBloodType(e.target.value) }>
        <option value='Não identificado / Não deseja Transfusão'>Não identificado / Não deseja tranfusão</option>
        <option value='A+'>A+</option>
        <option value='B+'>B+</option>
        <option value='AB+'>AB+</option>
        <option value='O+'>O+</option>
        <option value='A-'>A-</option>
        <option value='B-'>B-</option>
        <option value='AB-'>AB-</option>
        <option value='O-'>O-</option>
        <option value='Bombay'>Bombay</option>
        <option value='RH Nulo'>RH Nulo</option>
      </Form.Select>
    </Form.Group>
  )
}