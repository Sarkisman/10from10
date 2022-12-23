import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Nav, Navbar, NavbarBrand, NavbarText, NavItem,
} from 'reactstrap';
import { logoutThunk } from '../../../redux/actions/UserActions';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">10/10</NavbarBrand>
        {!user ? (
          <Nav style={{ width: '500px', justifyContent: 'space-between' }}>
            <NavItem>
              <Link to="/auth" style={{ textDecoration: 'none', color: 'black' }}>Войти</Link>
            </NavItem>
            <NavItem>
              <Link to="/reg" style={{ textDecoration: 'none', color: 'black' }}> Зарегистрироваться </Link>
            </NavItem>
          </Nav>
        ) : (
          <>
            <Nav style={{ width: '500px', justifyContent: 'space-between' }}>

              <NavItem>
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }} onClick={() => dispatch(logoutThunk())}> Выйти </Link>
              </NavItem>
            </Nav>
            <NavbarText>
              Привет -
              {' '}
              {user?.name}
            </NavbarText>
          </>
        )}

      </Navbar>

    </div>
  );
}

export default NavBar;
