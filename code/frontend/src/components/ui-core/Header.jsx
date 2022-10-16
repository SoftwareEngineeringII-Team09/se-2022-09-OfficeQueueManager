import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg='primary'>
            <Container fluid>
                <NavLink to='/home' className={({ isActive }) => isActive ? 'btn btn-primary text-decoration-none' : 'btn btn-light text-decoration-none'}>
                    <i className="bi bi-envelope"></i>
                    &nbsp;My study plan!
                </NavLink>
                <NavLink to='/login' className={({ isActive }) => isActive ? 'btn btn-primary text-decoration-none' : 'btn btn-light text-decoration-none'}>
                    Login
                </NavLink>
            </Container>
        </Navbar>
    )
}

export default Header;