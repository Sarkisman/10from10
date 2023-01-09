import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Col, Form, Input, Label, Row,
} from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getTypesAction, sendDataClub } from '../../../redux/actions/ClubActions';
import styles from './RegPageClub.module.css';

export default function ClubOrUser() {
  const navigate = useNavigate();
  const [select, setSelect] = useState([]);
  // const [avatar, setAvatar] = useState();
  const [coordinates, setCoordinates] = useState();
  const [adress, setAdress] = useState();
  const types = useSelector((state) => state.types);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { params } = useParams();
  useEffect(() => {
    dispatch(getTypesAction());
  }, []);
  // const formdata = new FormData();
  // formdata.append('avatar', avatar);
  const { ymaps } = window;
  const changeHandler = (e) => {
    ymaps.geocode(adress?.address)
      .then((res) => (
        setCoordinates(res.geoObjects.get(0).geometry.getCoordinates()).split(',')
      ));
    setAdress(
      (prev) => ({ ...prev, [e.target.name]: e.target.value }),
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const myGeocoder = ymaps.geocode((Object.fromEntries(new FormData(e.target))).address);
    myGeocoder
      .then((res) => (setCoordinates(res.geoObjects.get(0).geometry.getCoordinates()).split(',')));
    dispatch(sendDataClub(
      {
        user_id: params,
        latitude: coordinates[0],
        longitude: coordinates[1],
        input: Object.fromEntries(new FormData(e.target)),
        select,
      },
    ));
    navigate(`/lk/${user?.id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.closeButton}>
        <IconButton
          color="inherit"
          onClick={() => navigate(-1)}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <div className={styles.formContainer}>

        <Form onSubmit={(e) => submitHandler(e)}>
          <Row>
            <Col md={{
              offset: 3,
              size: 6,
            }}
            >
              <Label for="exampleEmail">
                Название клуба
              </Label>
              <Input
                name="clubName"
                placeholder="Как называется ваш клуб"
                type="text"
              />
              <Label for="exampleAddress">
                Адрес
              </Label>
              <Input
                onChange={changeHandler}
                id="exampleAddress"
                name="address"
                placeholder="1234 Main St"
              />
              <Label for="exampleAddress">
                Почта
              </Label>
              <Input
                onChange={changeHandler}
                id="exampleAddress"
                name="email"
                placeholder="email@email.ru"
              />
            </Col>
          </Row>
          <Row>
            <Row>
              <Col md={{
                offset: 3,
                size: 6,
              }}
              >
                <Label for="exampleEmail">
                  Выберите направление(я) вашего стрелкового клуба.
                </Label>
                <Multiselect
                  styles={{ color: 'black' }}
              // name="types"
                  displayValue="club_type"
                  isObject
              // onKeyPressFn={noRefCheck()}
              // onRemove={noRefCheck()}
              // onSearch={noRefCheck()}
                  onSelect={(e) => setSelect(() => [...e])}
                  options={types}
                />
              </Col>
            </Row>
          </Row>
          <Row>
            <Col md={{
              offset: 5,
              size: 6,
            }}
            >
              <Row>
                <Label for="examplePassword" />
              </Row>
              {/* <Input
            name="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setAvatar(file);
            }}
          /> */}
              <Button
                color="primary"
                outline
                type="submit"
              >
                Отправить заявку
              </Button>
            </Col>
            <Col md={{
              offset: 5,
              size: 6,
            }}
            >
              {/* {err && (<div style={{ color: 'red' }}>{err.message}</div>)} */}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
