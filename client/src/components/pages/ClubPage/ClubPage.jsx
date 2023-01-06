import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button, Card, Col, Form, Row,
  Modal, ModalHeader, ModalBody, ModalFooter, Input, Label,
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
  const [input, setInput] = useState({
    title: '', description: '', date: '', num_of_members: '',
  });
  const [modal, setModal] = useState(false);
  const [fileData, setFileData] = useState(club);
  const toggle = () => setModal(!modal);

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
  const changeHandler = async (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitModalHandler = (e) => {
    e.preventDefault();
    axios.post(`/events/suggestedByUser/club/${id}`, input);
    // .then((res) => {
    //   dispatch(addComment(res.data));
    // });
    // dispatch(asyncAddComment(e, input, id));
    // setInput({
    //   title: '', description: '', date: '', num_of_members: '',
    // });
    toggle();
  };

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
    if (fileData.avatar) (data.append('avatar', fileData.avatar));
    if (fileData.name) (data.append('name', fileData.name));
    if (fileData.phone) (data.append('phone', fileData.phone));
    if (fileData.address) (data.append('address', fileData.address));
    if (fileData.email) (data.append('email', fileData.email));
    if (fileData.description) (data.append('description', fileData.description));
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
              <Card
                className="sarkis"
              >
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
                    <Button
                      style={{ marginTop: '20px' }}
                      color="primary"
                      outline
                      onClick={() => clickHandler()}
                      type="button"
                    >
                      {' '}
                      Редактировать иформацию

                    </Button>
                  </div>
                )}
              </Card>
              {' '}
              {user?.id === club?.user_id && (
                <Button
                  color="primary"
                  type="button"
                  onClick={() => buttonHandler()}
                  style={{
                    width: '70%',
                    marginTop: '20px',

                  }}
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
              <div className="eventbaner">
                <h4>Предстоящие события клуба:</h4>

              </div>
              {upcomingEvents?.map((el) => <OneEventCard key={el.id} event={el} />)}
            </ul>
          </div>
          <div>

            <ul>
              <div className="eventbaner"><h4>Прошедшие события клуба:</h4></div>
              {pastEvents?.map((el) => <OneEventCard key={el.id} event={el} />)}
            </ul>
          </div>
          <div>

            <Button
              onClick={toggle}
              style={{ marginLeft: '10px' }}
              color="primary"
              outline
            >
              Предложить событие

            </Button>
          </div>

          {modal && (
            <div>

              <Modal
                isOpen={modal}
                modalTransition={{ timeout: 700 }}
                backdropTransition={{ timeout: 1300 }}
                toggle={toggle}
              >
                <ModalHeader toggle={toggle}>Предложить мероприятие:</ModalHeader>
                <ModalBody>
                  <Form
                    className="mb-3 mt-3"
                    onSubmit={submitModalHandler}
                  >
                    <Row>
                      <Col md={{
                        offset: 3,
                        size: 6,
                      }}
                      >
                        <Label for="exampleEmail">
                          Название мероприятия
                        </Label>
                        <Input
                          value={input.title}
                          onChange={changeHandler}
                          name="title"
                          placeholder="Название мероприятия"
                          id="text"
                        />
                        <Label for="exampleAddress">
                          Описание
                        </Label>
                        <Input
                          value={input.description}
                          onChange={changeHandler}
                          id="text"
                          name="description"
                          placeholder="описание мероприятия"
                        />
                        <Label for="exampleAddress">
                          Количество участников
                        </Label>
                        <Input
                          name="num_of_members"
                          placeholder="количество участников"
                          value={input.num_of_members}
                          onChange={changeHandler}
                          id="text"
                        />
                        <Label for="exampleAddress">
                          Выберите дату
                        </Label>
                        <Input onChange={changeHandler} value={input.date} type="date" name="date" min="2023-01-13" max="2024-06-08" />
                        <Button type="submit">
                          Отправить
                        </Button>
                      </Col>
                    </Row>

                    {/* <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      name="text"
                      placeholder="Ваш комментарий"
                      id="text"
                    /> */}
                    <ModalFooter>
                      <Button type="submit" color="primary">
                        Отправить
                      </Button>
                      {' '}
                      <Button color="secondary" onClick={toggle}>
                        Отмена
                      </Button>
                    </ModalFooter>

                  </Form>
                </ModalBody>

              </Modal>
            </div>
          )}

        </Col>
      </Row>
      <Row>

        <Col />
      </Row>
    </div>
  );
}

export default ClubPage;
