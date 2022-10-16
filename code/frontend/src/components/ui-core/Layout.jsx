import { Outlet } from "react-router";
import { Container, Row } from "react-bootstrap";

import Header from "./Header";

const Layout = () => {
    return (
        <Container fluid className="h-100 p-0 overflow-hidden d-flex flex-column justify-content-between">
            <Header />
            <Row className="d-flex flex-fill align-items-center text-center">
                <Outlet />
            </Row>
        </Container>
    );
}

export default Layout;