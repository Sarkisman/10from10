import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Nav, Navbar, NavbarBrand, NavbarText, NavItem,
} from 'reactstrap';
import { logoutThunk } from '../../../redux/actions/UserActions';
import styles from './NavBar.module.css';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <div>
      <Navbar>
        <NavbarBrand className={styles.textColor} href="/">10/10</NavbarBrand>
        {!user ? (
          <Nav className={styles.navFlex}>
            <NavItem>
              <Link className={styles.textColor} to="/auth" style={{ textDecoration: 'none', color: 'white' }}>Войти</Link>
            </NavItem>
            <NavItem>
              <Link className={styles.textColor} to="/reg" style={{ textDecoration: 'none', color: 'white' }}> Зарегистрироваться </Link>
            </NavItem>
          </Nav>
        ) : (
          <>
            <Nav className={styles.navFlex}>
              <NavItem>
                <Link className={styles.textColor} to={`/lk/${user.id}`}> Личный кабинет </Link>
              </NavItem>
              <NavItem>
                <Link className={styles.textColor} to="/" onClick={() => { dispatch(logoutThunk()); window.location.href = '/'; }}> Выйти </Link>
              </NavItem>
            </Nav>
            <NavbarText className={styles.textColor}>
              Привет -
              {' '}
              {user?.name}
            </NavbarText>
          </>
        )}

        { user ? (
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid',
          }}
          >
            <img
              src={`http://localhost:3001/${user?.avatar}`}
              alt="avatar"
              style={{
                heigh: 'auto',
                width: '100%',
              }}
            />
          </div>
        ) : ''}
      </Navbar>

    </div>
  );
}

export default NavBar;
