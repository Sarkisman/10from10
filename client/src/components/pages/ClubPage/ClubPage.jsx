import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card, Col, Form, Row,
} from 'reactstrap';
import { changeClubThunk, getAllClubs } from '../../../redux/actions/ClubActions';
import { getEventsByClub } from '../../../redux/actions/eventActions';
import OneEventCard from '../../ui/OneEventCard/OneEventCard';

import './style.css';

function ClubPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const clubs = useSelector((store) => store.clubs);
  const club = clubs.find((el) => el.id === +id);
  const events = useSelector((store) => store.events);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(club?.avatar || 'ZaglushkaClub.jpeg');
  const [isEdit, setEdit] = useState(false);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const pastEvents = events.filter((event) => new Date(event.date) <= today);
  // const [fileData, setFileData] = useState({
  //   avatar: null,
  //   email: '',
  //   phone: '',
  //   title: '',
  //   address: '',
  //   description: '',
  // });
  const [fileData, setFileData] = useState(club);

  const changeImg = (e) => {
    setFileData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };
  const changedata = (e) => {
    setFileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clickHandler = () => {
    setEdit(!isEdit);
  };

  useEffect(() => {
    if (club?.avatar) {
      setAvatar(club?.avatar);
    }
  }, [clubs]);

  useEffect(() => {
    dispatch(getAllClubs());
    dispatch(getEventsByClub(id));
  }, []);

  const submitHandler = () => {
    const data = new FormData();
    data.append('avatar', fileData.avatar);
    data.append('name', fileData.name);
    data.append('phone', fileData.phone);
    data.append('email', fileData.email);
    data.append('address', fileData.address);
    data.append('description', fileData.description);
    dispatch(changeClubThunk(club.id, data));
    clickHandler();
  };

  const buttonHandler = () => {
    navigate(`/event/new/${club.id}`);
  };

  return (
    <div>
      <Row>
        <Col className="split left">
          {!isEdit ? (
            <>
              <Card className="sarkis">
                <img
                  alt="Sample"
                  src={`http://localhost:3001/${avatar}`}
                  style={{
                    marginTop: '10px',
                    width: '250px',
                    heigh: '300px',
                    borderRadius: '100px',
                  }}
                />
                <div>
                  <b>название клуба: </b>
                  {club?.name}
                </div>
                <div>
                  <b>телефон: </b>
                  {club?.phone}
                </div>
                <div>
                  <b>электронная почта: </b>
                  {club?.email}
                </div>
                <div>
                  <b>Адрес клуба: </b>
                  {club?.address}
                </div>
                <div>
                  <b>о клубе: </b>
                  {club?.description}
                </div>

                {user?.id === club?.user_id && (
                  <div>
                    <Button onClick={() => clickHandler()} type="button"> Редактировать иформацию</Button>
                  </div>
                )}
              </Card>
              {' '}
              {user?.id === club?.user_id && (
                <Button
                  color="primary"
                  outline
                  type="button"
                  onClick={() => buttonHandler()}
                >
                  Новое событие
                </Button>
              )}
            </>
          ) : (
            <Card>
              <Form onSubmit={(e) => submitHandler(e, club.id)}>
                <div>
                  <img
                    alt="Sample"
                    src={`http://localhost:3001/${avatar}`}
                    style={{
                      marginTop: '10px',
                      width: '250px',
                      heigh: '300px',
                      borderRadius: '100px',
                    }}
                  />
                  <input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={changeImg}
                  />
                </div>
                <div>
                  <input
                    name="name"
                    value={fileData?.name}
                    placeholder="Введите название клуба"
                    type="text"
                    onChange={changedata}
                  />
                </div>
                <div>
                  <input
                    name="phone"
                    value={fileData?.phone}
                    placeholder="Номер телефона"
                    type="text"
                    onChange={changedata}
                  />
                </div>
                <div>
                  <input
                    name="email"
                    value={fileData?.email}
                    placeholder="Почта"
                    type="text"
                    onChange={changedata}
                  />
                </div>
                <div>
                  <input
                    name="address"
                    value={fileData?.address}
                    placeholder="Address"
                    type="text"
                    onChange={changedata}
                  />
                </div>
                <div>
                  <textarea
                    cols="60"
                    rows="4"
                    name="description"
                    value={fileData?.description}
                    placeholder="Опишите ваш клуб"
                    type="text"
                    onChange={changedata}
                  />
                </div>
                <div>
                  <Button type="submit"> Редактировать иформацию</Button>
                </div>
              </Form>
            </Card>

          )}

        </Col>

        <Col className="split right">
          <div>

            <ul>
              Предстоящие события клуба:
              {upcomingEvents?.map((el) => <OneEventCard key={el.id} event={el} />)}
            </ul>
          </div>
          <div>

            <ul>
              Прошедшие события клуба:
              {pastEvents?.map((el) => <OneEventCard key={el.id} event={el} />)}
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col />
      </Row>
    </div>
  );
}

export default ClubPage;
