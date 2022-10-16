import { Routes, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import * as Pages from './pages';

import { UI } from './components';

function App() {
  return (

    <Container fluid>
      <Row>
        <UI.Header />
      </Row>
      <Routes>
        <Route index path='/' element={<Pages.Home />} />
        <Route path='*' element={<Pages.Default />} />
      </Routes>
    </Container>

  );
}

export default App;