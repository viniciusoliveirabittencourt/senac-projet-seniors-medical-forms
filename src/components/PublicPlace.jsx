import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function PublicPlace ({ publicPlaceHandler, setValidpublicPlace, setInvalidpublicPlace, value }) {
  const [publicPlace, setpublicPlace] = useState(value);
  const [publicPlaceValid, setpublicPlaceValid] = useState(false);
  const publicPlaceLength = publicPlace.length < 5;
  useEffect(() => {
    if (!publicPlace || !publicPlaceLength) {
      setpublicPlaceValid(true);
    } else {
      setpublicPlaceValid(false);
    }
    publicPlaceHandler(publicPlace);
    !publicPlaceLength && publicPlace ? setValidpublicPlace() : setInvalidpublicPlace();
  }, [publicPlace])

  return (
    <Form.Group className="mb-3" controlId="formBasicpublicPlace">
      <Form.Label>Logradouro:</Form.Label>
      <Form.Control onChange={ (e) => setpublicPlace(e.target.value) } value={ publicPlace } type="text" placeholder="Logradouro" />
      <Form.Text className={ `${ publicPlaceValid ? 'displayNone' : '' } red` }>
        Logradouro n pode ser menos de 5 caracteres!
      </Form.Text>
    </Form.Group>
  )
}