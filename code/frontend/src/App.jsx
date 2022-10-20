import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import * as Pages from './pages';

import { UI } from './components';

import api from './services/api';

function App() {
  const location = useLocation();
  const [serviceList, setServiceList] = useState([]);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    const getServiceList = async () => {
      try{
        const list = await api.getServiceList();
        setServiceList(list.services);
      }
      catch(err){
        setErrMessage('Error while retrieving the list of services.')
      }
    }
    getServiceList();
  }, []);

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<UI.Layout />}>
        <Route path='/officer' element={<Pages.Officer />} />
        <Route index path='/' element={<Pages.Home serviceList={serviceList} setErrMessage={setErrMessage} />} />
        <Route path='*' element={<Pages.Default />} />
      </Route>
    </Routes>
  );
}

export default App;