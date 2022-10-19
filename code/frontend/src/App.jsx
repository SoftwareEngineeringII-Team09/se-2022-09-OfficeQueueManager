import { Routes, Route, useLocation } from 'react-router-dom';

import * as Pages from './pages';

import { UI } from './components';

function App() {
  const location = useLocation();
  const serviceList = ['service1', 'service2'];

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<UI.Layout />}>
        <Route path='/officer' element={<Pages.Officer />} />
        <Route index path='/' element={<Pages.Home serviceList={serviceList} />} />
        <Route path='*' element={<Pages.Default />} />
      </Route>
    </Routes>
  );
}

export default App;