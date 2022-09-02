import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function City ({ CityHandler, setValidCity, setInvalidCity }) {
  const [City, setCity] = useState('');
  const [CityValid, setCityValid] = useState(false);
  const CityLength = City.length < 3 || City.length > 56;
  useEffect(() => {
    if (!City || !CityLength) {
      setCityValid(true);
    } else {
      setCityValid(false);
    }
    CityHandler(City);
    !CityLength && City ? setValidCity() : setInvalidCity();
  }, [City])

  return (
    <Form.Group className="mb-3" controlId="formBasicCity">
      <Form.Label>Cidade:</Form.Label>
      <Form.Control onChange={ (e) => setCity(e.target.value) } value={ City } type="text" placeholder="Cidade" />
      <Form.Text className={ `${ CityValid ? 'displayNone' : '' } red` }>
        Não existe cidade com menos de 3 letras e com mais de 56 letras!
      </Form.Text>
    </Form.Group>
  )
}