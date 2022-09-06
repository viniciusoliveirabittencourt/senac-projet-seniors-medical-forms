import { Row, Col, Container, Navbar, Button } from 'react-bootstrap';
import axios from '../../../node_modules/axios/index';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ModalExclude from '../../components/ModalExclude';

export default function overview () {
  const [user, setUser] = useState();
  const [carregando, setCarregando] = useState(false);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleOpenAndSetId = (idPar) => {
    setShow(true);
    setId(idPar);
  }

  const excludSenior = async () =>{
    try {
      setCarregando(true);
      await axios.delete('/api/deleteSenior', { headers: { id } } );
      setCarregando(false);
      handleClose();
    } catch (e) {
      console.log(e);
      setCarregando(false);
    }
  }

  const handleClose = () => {
    setShow(false);
  }

  const getUser = async () => {
    try {
      const body = {
        email: router.query.id
      }
      const { data } = await axios.post('/api/getUserInfo', body, { headers: { 'Content-Type': 'application/json' } });
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  const creSeniorArr = () => {
    if (user.mySenior.lenght === 0) {
      return <h3>Não á idosos cadastrados!</h3>
    }

    return user.mySenior.map((i, j) => {
      return <div key={ j } className='cardmy mb-3 my-3 pointer'>
        <Link href={ `/responsible/senior/create/${ i._id }` }>
          <img src={ i.photo } className='photoCard pointer' />
        </Link>
        <Link href={ `/responsible/senior/update/${ i._id }` }>
          <h6  className='fraseCard pointer'>{ i.name }</h6>
        </Link>
        <img className='qr mx-3 pointer' src='https://cdn-icons-png.flaticon.com/512/747/747470.png' />
        <Button onClick={ () => handleOpenAndSetId(i._id) } variant='danger'>
            { 'X' }
        </Button>
        <div className='line my-3'></div>
      </div>
    });
  }

  return (
    user ?
    <>
      <ModalExclude carregando={ carregando } excludSenior={ excludSenior } handleClose={ handleClose } show={ show }  />
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
      <Container>
        <Row className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col xs lg="10">
              <Link href={`/responsible/senior/create/${router.query.id}`}>
                <Button>
                  { 'Adicionar +' }
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="10">
              { creSeniorArr() }
            </Col>
          </Row>
        </Row>
      </Container>
    </> : <h1>Carregando...</h1>
  )
}