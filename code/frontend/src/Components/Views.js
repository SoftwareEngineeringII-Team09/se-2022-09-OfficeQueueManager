import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

function DefaultView() {
  return(
    <>
      <Row>
        <Container fluid className='my-2 d-flex flex-column align-items-center'>
          <h1>Unexisting page!</h1>
          <p>Check the url on your browser, it may be wrong!</p>
        </Container>
      </Row>
    </>
  );
}

function MainView(props) {
  return(
    <>
      <Row>
        <Container fluid className='my-2 d-flex flex-column align-items-center'>
          <h1>Office queue management system!</h1>
          <span>This page will be developed soon.</span>
        </Container>
      </Row>
    </>
  );
}

export { DefaultView, MainView };