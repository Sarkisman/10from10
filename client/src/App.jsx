import React, { useEffect, useState } from 'react';
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
import Lk from './components/pages/Lk/Lk';
import RegPageClub from './components/pages/RegPageClub';
import EventPage from './components/pages/EventPage';
import ClubPage from './components/pages/ClubPage/ClubPage';
import NewClubEventPage from './components/pages/NewClubEventPage';
import Err from './components/pages/Err/Err';
import SelectMUI from './components/ui/SelectMUI/SelectMUI';

function App() {
  const [isRender, setIsRender] = useState(true);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (

    <Container>

      {!user?.isFetching ? (
        <div>

          <NavBar isRender={isRender} setIsRender={setIsRender} />
          <Routes>
            <Route path="*" element={<Err />} />
            <Route path="/" element={<MainPage isRender={isRender} setIsRender={setIsRender} />} />
            <Route element={<PrivateRoute isAllowed={!user?.id} redirectPath="/" />}>
              <Route path="/auth" element={<LoginPage />} />
              <Route path="/reg" element={<RegPage />} />
            </Route>
            <Route element={<PrivateRoute isAllowed={user?.id} redirectPath="/auth" />}>
              <Route path="/lk/:id" element={<Lk />} />
              <Route path="/club/:id" element={<ClubPage />} />
              <Route path="/reg/:params" element={<RegPageClub />} />
              <Route path="/events/club/:id" element={<EventPage />} />
              <Route path="/event/new/:id" element={<NewClubEventPage />} />
            </Route>
          </Routes>
        </div>
      ) : (<div>LOADING</div>)}

    </Container>
  );
}
export default App;
