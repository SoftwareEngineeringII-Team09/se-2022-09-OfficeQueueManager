import { Container, Row } from 'react-bootstrap';

const Default = () => {
    return (
        <Row>
            <Container fluid className='my-2 d-flex flex-column align-items-center'>
                <h1>Unexisting page!</h1>
                <p>Check the url on your browser, it may be wrong!</p>
            </Container>
        </Row>
    );
}

export default Default;