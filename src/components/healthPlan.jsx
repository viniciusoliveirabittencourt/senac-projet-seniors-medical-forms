import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function HealpPlan ({ HealpPlanHandler, setValidHealpPlan, value }) {
  const [HealpPlan, setHealpPlan] = useState(value);
  const [HealpPlanValid, setHealpPlanValid] = useState(false);
  const HealpPlanLength = HealpPlan.length < 3;
  useEffect(() => {
    if (!HealpPlan || !HealpPlanLength) {
      setHealpPlanValid(true);
    } else {
      setHealpPlanValid(false);
    }
    HealpPlanHandler(HealpPlan);
    !HealpPlanLength && HealpPlan ? setValidHealpPlan(true) : setValidHealpPlan(false);
  }, [HealpPlan])

  return (
    <Form.Group className="mb-3" controlId="formBasicHealpPlan">
      <Form.Label>Plano de Saúde:</Form.Label>
      <Form.Control onChange={ (e) => setHealpPlan(e.target.value) } value={ HealpPlan } type="text" placeholder="Plano de saúde" />
      <Form.Text className={ `${ HealpPlanValid ? 'displayNone' : '' } red` }>
        Plano de saúde n pode ter menos de 3 caracteres!
      </Form.Text>
    </Form.Group>
  )
}