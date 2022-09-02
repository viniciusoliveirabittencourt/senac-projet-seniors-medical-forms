import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function Country ({ countryHandler, setValidcountry, setInvalidcountry }) {
  const [country, setcountry] = useState('');
  const [countryValid, setcountryValid] = useState(false);
  const countryLength = country.length < 3 || country.length > 56;
  useEffect(() => {
    if (!country || !countryLength) {
      setcountryValid(true);
    } else {
      setcountryValid(false);
    }
    countryHandler(country);
    !countryLength && country ? setValidcountry() : setInvalidcountry();
  }, [country])

  return (
    <Form.Group className="mb-3" controlId="formBasiccountry">
      <Form.Label>País:</Form.Label>
      <Form.Control onChange={ (e) => setcountry(e.target.value) } value={ country } type="text" placeholder="País" />
      <Form.Text className={ `${ countryValid ? 'displayNone' : '' } red` }>
        Não existe país com menos de 3 letras e com mais de 56 letras!
      </Form.Text>
    </Form.Group>
  )
}