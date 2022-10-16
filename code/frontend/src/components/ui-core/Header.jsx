import { useState } from 'react';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { links } from '../../constants';

const Brand = () => {
    return (
        <Col>
            <NavLink to='/' className="text-decoration-none">
                <Navbar.Brand>
                    <span className='fw-black text-primary fs-1'>
                        OQM
                    </span>
                </Navbar.Brand>
            </NavLink>
        </Col>
    );
}

const LoggedInNav = () => {
    const [user] = useState("manager")

    const logout = (e) => {
        e.preventDefault();
        // ---- TODO: Add API to perform logout
    }

    return (
        <Col className='fs-5 text-end'>

            {user.toUpperCase() === "MANAGER" && links.map(link =>
                <NavLink to={link.url} className='fw-bold ms-4 text-decoration-none'
                    style={({ isActive }) => isActive ? { opacity: "100%" } : { opacity: "50%" }}>
                    {link.icon}
                    <span className='ms-2'>{link.label}</span>
                </NavLink>
            )}

            <Button variant='ghost' className='p-0 fs-5 fw-bold text-primary ms-4' onClick={logout}>
                <FontAwesomeIcon icon="fas fa-right-from-bracket" className='opacity-50' />
                <span className='ms-2'>Logout</span>
            </Button>
        </Col>
    );
}

const NotLoggedInNav = () => {
    return (
        <Col className='fs-5 text-end'>
            <span className='opacity-75'>Are you an employee?</span>
            <NavLink to='/login' className='fw-bold ms-2'>
                Login now
            </NavLink>
        </Col>
    );
}

const Header = () => {
    const [loggedIn] = useState(false);

    return (
        <Navbar fixed='top' bg='gray-light' className='p-4'>
            <Container fluid>
                <Row className='w-100 align-items-center'>
                    <Brand />

                    {!loggedIn && <Col className='d-none d-lg-block fw-bold fs-5 text-center'>
                        <NavLink to='/' className='text-decoration-none'>
                            Take your ticket
                        </NavLink>
                    </Col>}

                    {loggedIn ? <LoggedInNav /> : <NotLoggedInNav />}
                </Row>
            </Container>
        </Navbar>
    )
}

export default Header;