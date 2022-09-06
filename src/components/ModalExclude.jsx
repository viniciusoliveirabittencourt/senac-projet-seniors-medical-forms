import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function ModalExclude({ show, handleClose, excludSenior, carregando }) {
  const [input, setInput] = useState('');
  const validExclud = input === 'excluir';

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Realmente deseja excluir esse idoso ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Para excluir esse idoso, digite "<em>excluir</em>"
          <Form>
            <Form.Group>
              <Form.Control onChange={ (e) => setInput(e.target.value) } type='text' placeholder='excluir' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            { '< Voltar' }
          </Button>
          <Button onClick={ () => excludSenior() } disabled={ !validExclud } variant="primary">{ carregando ? 'Carregando...' : 'Excluir' }</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}