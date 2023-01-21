import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button, Card, Col, Form, Row,
  Modal, ModalHeader, ModalBody, ModalFooter, Input, Label,
} from 'reactstrap';
import { changeClubThunk, getAllClubs } from '../../../redux/actions/ClubActions';
import { getEventsByClub, submitEvent } from '../../../redux/actions/eventActions';
import OneEventCard from '../../ui/OneEventCard/OneEventCard';

import './style.css';
import { asyncAddUserSuggestedEvent, asyncDeleteUserSuggestedEvent, asyncSetUserSuggestedEvents } from '../../../redux/actions/userSuggestedEventsActions';

function ClubPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const clubs = useSelector((store) => store.clubs);
  const club = clubs.find((el) => el.id === +id);
  const events = useSelector((store) => store.events);
  const userSuggestedEvents = useSelector((store) => store.userSuggestedEvents);
  console.log('userSuggestedEvents', userSuggestedEvents);
  // const necessaryEvents = userSuggestedEvents?.find((el) => el.club_id === Number(id));

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(club?.avatar || 'ZaglushkaClub.jpeg');
  const [isEdit, setEdit] = useState(false);
  const [input, setInput] = useState({
    title: '', description: '', date: '', num_of_members: '', email: '',
  });
  const [modal, setModal] = useState(false);
  const [fileData, setFileData] = useState(club);
  const toggle = () => setModal(!modal);

  const [modalConfirmation, setModalConfirmation] = useState(false);
  const toggleAgain = () => setModalConfirmation(!modalConfirmation);

  const [modalIncomingEventRequest, setModalIncomingEventRequest] = useState(false);
  const toggleIncoming = () => setModalIncomingEventRequest(!modalIncomingEventRequest);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  const changeHandler = async (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const incomingModalHandler = (e) => {
    dispatch(submitEvent(e, userSuggestedEvents[0], id));
    dispatch(asyncDeleteUserSuggestedEvent(userSuggestedEvents[0].id));
    toggleIncoming();
  };

  const submitModalHandler = (e) => {
    dispatch(asyncAddUserSuggestedEvent(e, input, id));
    setInput({
      title: '', description: '', date: '', num_of_members: '', email: '',
    });
    toggleAgain();
    toggle();
  };
  useEffect(() => {
    if (modalConfirmation) {
      setTimeout(() => {
        setModalConfirmation(false);
      }, 2000);
    }
  }, [modalConfirmation]);

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
    dispatch(asyncSetUserSuggestedEvents(id));
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
  const day = new Date();
  const date = day.toISOString();
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
                  <b>Название клуба: </b>
                  {club?.name}
                </div>
                <div>
                  <b>Телефон: </b>
                  {club?.phone}
                </div>
                <div>
                  <b>Электронная почта: </b>
                  {club?.email}
                </div>
                <div>
                  <b>Адрес клуба: </b>
                  {club?.address}
                </div>
                <div>
                  <b>О клубе: </b>
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
          <div>
            {user?.id !== club?.user_id && (
              <Button
                onClick={toggle}
                style={{
                  marginTop: '15px',
                  width: '445px',
                }}
                color="primary"
              >
                Заявка на проведение мероприятия
              </Button>
            )}

          </div>

          <div>
            {(userSuggestedEvents?.length && club.user_id === user.id) && (
              <Button
                onClick={toggleIncoming}
                style={{
                  marginTop: '15px',
                  width: '445px',
                }}
                color="primary"
              >
                Входящая заявка
                {' '}
                {userSuggestedEvents?.length}
              </Button>
            )}

          </div>

          {modalIncomingEventRequest && (
            <div>

              <Modal
                isOpen={modalIncomingEventRequest}
                modalTransition={{ timeout: 100 }}
                backdropTransition={{ timeout: 300 }}
                toggle={toggleIncoming}
              >
                <ModalHeader toggle={toggleIncoming}>Входящая заявка:</ModalHeader>
                <ModalBody>
                  <Form
                    className="mb-3 mt-3"
                    onSubmit={incomingModalHandler}
                  >
                    <Row>
                      <Col md={{
                        offset: 2,
                        size: 8,
                      }}
                      >
                        <Label for="exampleEmail">
                          Название мероприятия:
                        </Label>
                        <Input
                          value={userSuggestedEvents[0]?.title}
                          onChange={changeHandler}
                          name="title"
                          placeholder="Название мероприятия"
                          id="text"
                        />
                        <Label for="exampleAddress">
                          Описание:
                        </Label>
                        <Input
                          type="textarea"
                          value={userSuggestedEvents[0]?.description}
                          onChange={changeHandler}
                          id="text"
                          name="description"
                          placeholder="описание мероприятия"
                          style={{ resize: 'none' }}
                        />
                        <Label for="exampleAddress">
                          Количество участников:
                        </Label>
                        <Input
                          name="num_of_members"
                          placeholder="количество участников"
                          value={userSuggestedEvents[0]?.num_of_members}
                          id="text"
                        />
                        <Label for="exampleAddress">
                          Выберите дату:
                        </Label>
                        <Input value={userSuggestedEvents[0]?.date} type="date" name="date" min={date.slice(0, 10)} max="2025-01-10" />
                        <Label for="exampleAddress">
                          Время начала мероприятия
                        </Label>
                        <Input value={userSuggestedEvents[0]?.time} type="time" name="time" />
                        <Label for="exampleEmail">
                          Ваша почта:
                        </Label>
                        <Input
                          value={userSuggestedEvents[0]?.email}
                          onChange={changeHandler}
                          name="email"
                          placeholder="Почта"
                          id="text"
                        />
                      </Col>
                    </Row>
                    <ModalFooter>
                      <Button type="submit" color="primary">
                        Одобрить
                      </Button>
                      {' '}
                      <Button
                        color="secondary"
                        onClick={() => {
                          dispatch(asyncDeleteUserSuggestedEvent(userSuggestedEvents[0].id));
                          toggleIncoming();
                        }}
                      >
                        Отклонить
                      </Button>
                    </ModalFooter>
                  </Form>
                </ModalBody>
              </Modal>
            </div>
          )}

        </Col>

        <Col className="split right">
          <div>
            <ul>
              <div className="eventbaner">
                <h4>Предстоящие события клуба:</h4>

              </div>
              {upcomingEvents?.map((el) => <OneEventCard key={el.id} club={club} event={el} />)}
            </ul>
          </div>
          <div>

            <ul>
              <div className="eventbaner"><h4>Прошедшие события клуба:</h4></div>
              {pastEvents?.map((el) => <OneEventCard key={el.id} club={club} event={el} />)}
            </ul>
          </div>
          {modal && (
            <div>

              <Modal
                isOpen={modal}
                modalTransition={{ timeout: 100 }}
                backdropTransition={{ timeout: 300 }}
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
                        offset: 2,
                        size: 8,
                      }}
                      >
                        <Label for="exampleEmail">
                          Название мероприятия:
                        </Label>
                        <Input
                          value={input.title}
                          onChange={changeHandler}
                          name="title"
                          placeholder="Название мероприятия"
                          id="text"
                        />
                        <Label for="exampleAddress">
                          Описание:
                        </Label>
                        <Input
                          type="textarea"
                          value={input.description}
                          onChange={changeHandler}
                          id="text"
                          name="description"
                          placeholder="описание мероприятия"
                          style={{ resize: 'none' }}
                        />
                        <Label for="exampleAddress">
                          Количество участников:
                        </Label>
                        <Input
                          name="num_of_members"
                          placeholder="количество участников"
                          value={input.num_of_members}
                          onChange={changeHandler}
                          id="text"
                        />
                        <Label for="exampleAddress">
                          Выберите дату:
                        </Label>
                        <Input onChange={changeHandler} value={input.date} type="date" name="date" min={date.slice(0, 10)} max="2025-01-10" />
                        <Label for="exampleAddress">
                          Время начала мероприятия
                        </Label>
                        <Input onChange={changeHandler} value={input.time} type="time" name="time" />
                        <Label for="exampleEmail">
                          Ваша почта:
                        </Label>
                        <Input
                          value={input.email}
                          onChange={changeHandler}
                          name="email"
                          placeholder="Почта"
                          id="text"
                        />
                      </Col>
                    </Row>
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
          {modalConfirmation && (
            <div>
              <Modal
                isOpen={modalConfirmation}
                modalTransition={{ timeout: 100 }}
                backdropTransition={{ timeout: 300 }}
                toggle={toggleAgain}
              >
                <ModalBody>Ваша заявка отправлена! Ожидайте подтверждения заказа на Email!</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={toggleAgain}>
                    Закрыть
                  </Button>
                </ModalFooter>
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
