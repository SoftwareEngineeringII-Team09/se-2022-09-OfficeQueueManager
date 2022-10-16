import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar fixed='top' bg='gray-light' className='p-4'>
            <Container fluid>
                <Row className='w-100 align-items-center'>
                    <Col>
                        <NavLink to='/' className="text-decoration-none">
                            <Navbar.Brand>
                                <span className='fw-black text-primary fs-1'>
                                    OQM
                                </span>
                            </Navbar.Brand>
                        </NavLink>
                    </Col>

                    <Col className='d-none d-lg-block fw-bold fs-5 text-center'>
                        <NavLink to='/' className='text-decoration-none'>
                            Take your ticket
                        </NavLink>
                    </Col>

                    <Col className='fs-5 text-end'>
                        <span className='opacity-75'>Are you an employee?</span>
                        <NavLink to='/login' className='fw-bold ms-2'>
                            Login now
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default Header;