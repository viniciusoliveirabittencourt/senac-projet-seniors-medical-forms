import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function Neiborhood ({ neiborhoodHandler, setValidneiborhood, setInvalidneiborhood }) {
  const [neiborhood, setneiborhood] = useState('');
  const [neiborhoodValid, setneiborhoodValid] = useState(false);
  const neiborhoodLength = neiborhood.length < 3 || neiborhood.length > 56;
  useEffect(() => {
    if (!neiborhood || !neiborhoodLength) {
      setneiborhoodValid(true);
    } else {
      setneiborhoodValid(false);
    }
    neiborhoodHandler(neiborhood);
    !neiborhoodLength && neiborhood ? setValidneiborhood() : setInvalidneiborhood();
  }, [neiborhood])

  return (
    <Form.Group className="mb-3" controlId="formBasicneiborhood">
      <Form.Label>Bairro:</Form.Label>
      <Form.Control onChange={ (e) => setneiborhood(e.target.value) } value={ neiborhood } type="text" placeholder="Bairro" />
      <Form.Text className={ `${ neiborhoodValid ? 'displayNone' : '' } red` }>
        Não existe bairro com menos de 3 letras e com mais de 56 letras!
      </Form.Text>
    </Form.Group>
  )
}