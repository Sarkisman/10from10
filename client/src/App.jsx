import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import RegPage from './components/pages/RegPage';
import MainPage from './components/pages/MainPage';
import NavBar from './components/ui/NavBar/NavBar';
import LoginPage from './components/pages/LoginPage';
import PrivateRoute from './HOC/PrivateRoute';
import { checkAuth } from './redux/actions/UserActions';
import RegPageClub from './components/pages/RegPageClub';

function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <Container>
      {!user?.isFetching ? (
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route element={<PrivateRoute isAllowed={!user?.id} redirectPath="/" />}>
              <Route path="/auth" element={<LoginPage />} />
              <Route path="/reg" element={<RegPage />} />
              <Route path="/reg/:params" element={<RegPageClub />} />
            </Route>
            {/* <Route element={<PrivateRoute isAllowed={user?.id} />}>
            </Route> */}
          </Routes>
        </div>
      ) : (<div>LOADING</div>)}

    </Container>
  );
}
export default App;
