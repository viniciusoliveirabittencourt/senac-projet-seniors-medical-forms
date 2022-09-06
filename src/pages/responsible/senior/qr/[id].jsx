import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

export default function QrCode() {
  const router = useRouter();
  const [routerReady, setRouterReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return
    } else {
      setRouterReady(true);
    }
  }, [router.isReady]);

  const getResponsible = () => {
    const id = router.query.id;
    const idArr = id.split('_');
    return idArr[0];
  }

  return (
    routerReady ?
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <h2>Qr Code do idoso!</h2>
          <img className='mb-3' src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://senac-projet-seniors.vercel.app/${router.query.id}`} />
          <Col>
            <Link href={ `/responsible/${getResponsible()}` }>
              <Button size='lg' variant='success'>
                { '< Voltar' }
              </Button>
            </Link>
          </Col>
        </Col>
      </Row>
    </Container> : <h1>Carregando...</h1>
  );
};