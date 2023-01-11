import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Nav, Navbar, NavbarBrand, NavbarText, NavItem,
} from 'reactstrap';
import { logoutThunk } from '../../../redux/actions/UserActions';
import SelectMUI from '../SelectMUI/SelectMUI';
import classes from './NavBar.module.css';

function NavBar({ isRender, setIsRender }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  return (
    <div>
      <Navbar>
        {!user ? (
          <Nav className={classes.navFlex}>
            <NavbarBrand className={classes.textColor} href="/">10/10</NavbarBrand>
            <NavItem>
              <Link className={classes.textColor} to="/auth">Войти</Link>
            </NavItem>
            <NavItem>
              <Link className={classes.textColor} to="/reg"> Зарегистрироваться </Link>
            </NavItem>
          </Nav>
        ) : (
          <>
            <Nav className={classes.navFlex}>
              <NavbarBrand className={classes.textColor} href="/">10/10</NavbarBrand>
              <NavItem>
                <Link className={classes.textColor} to={`/lk/${user.id}`}> Личный кабинет </Link>
              </NavItem>
              {(window.location.pathname === '/') && <SelectMUI isRender={isRender} setIsRender={setIsRender} />}
              <div className={classes.exitAvatarFlex}>
                {' '}
                {user ? (
                  <div style={{ marginRight: '25px' }}>
                    <div className={classes.navAvatar}>
                      <img
                        className={classes.navAvatarImg}
                        src={`http://localhost:3001/${user?.avatar}`}
                        alt="avatar"
                      />
                    </div>
                    <div style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                    >
                      {user?.name}
                    </div>
                  </div>
                ) : ''}
                <div>
                  <NavItem>
                    <Link className={classes.textColor} to="/" onClick={() => { dispatch(logoutThunk()); window.location.href = '/'; }}> Выйти </Link>
                  </NavItem>
                </div>
              </div>
            </Nav>
          </>
        )}

      </Navbar>

    </div>
  );
}

export default NavBar;
