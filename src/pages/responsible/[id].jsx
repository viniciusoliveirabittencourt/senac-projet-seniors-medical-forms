import { Row, Col, Container, Navbar, Button } from 'react-bootstrap';
import axios from '../../../node_modules/axios/index';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function overview () {
  const [user, setUser] = useState();
  const router = useRouter();

  const getUser = async () => {
    try {
      const body = {
        email: router.query.id
      }
      const { data: message } = await axios.post('/api/getUserInfo', body, { headers: { 'Content-Type': 'application/json' } });
      setUser(message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  return (
    user ?
    <Container>
      <Navbar>
        <Container>
          <Link href="/"><Button variant="success">{ '< Voltar' }</Button></Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link href={`/responsible/update/${router.query.id}`}>
              <img src={ user.message.photo } className='photoNav pointer' />
            </Link>
            <Link href={`/responsible/update/${router.query.id}`}>
              <h6 className='mx-2 pointer'>
                { user.message.name }
              </h6>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container> : <h1>Carregando...</h1>
  )
}