import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function gender({ value, setGenderFunc }) {
  const [gender, setGender] = useState(value);

  useEffect(() => {
    setGenderFunc(gender);
  }, [gender])

  return (
    <Form.Group className="mb-3" controlId="formBasicHealpPlan">
      <Form.Label>Gênero:</Form.Label>
      <Form.Select value={ gender } onChange={ (e) => setGender(e.target.value) }>
        <option value='Não identificado'>Não identificado</option>
        <option value='Masculino'>Masculino</option>
        <option value='Feminino'>Feminino</option>
      </Form.Select>
    </Form.Group>
  )
}