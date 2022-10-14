import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Container, Row, Spinner } from 'react-bootstrap';

import NavbarComponent from './Components/NavbarComponent';
import { DefaultView, MainView } from './Components/Views';

import API from './API';

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <NavbarComponent/>
        </Row>
        <Routes>
          <Route path='/home' element={<MainView/>} />
          <Route path='*' element={<DefaultView/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;