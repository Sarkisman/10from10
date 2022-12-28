import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card, Col, Form, Row,
} from 'reactstrap';
import { getAllClubs } from '../../../redux/actions/ClubActions';
import { getEventsByClub } from '../../../redux/actions/eventActions';
import OneEventCard from '../../ui/OneEventCard/OneEventCard';
import './style.css';

function ClubPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const clubs = useSelector((store) => store.clubs); // .find((el) => el.id === id);
  const club = clubs.find((el) => el.id === +id);
  const events = useSelector((store) => store.events);
  const navigate = useNavigate();
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getAllClubs());
    dispatch(getEventsByClub(id));
  }, []);

  const buttonHandler = () => {
    navigate(`/event/new/${club.id}`);
  };

  const clickHandler = () => {
    setEdit(!isEdit);
  };

  return (

  // <Card
  //   style={{

  //     width: '300px',
  //     dispaly: 'flex',
  //     flexDirection: 'column',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   }}
  // >
  //   <img
  //     alt="Sample"
  //     src={`http://localhost:3001/${avatar}`}
  //     style={{
  //       marginTop: '10px',
  //       width: '250px',
  //       heigh: '300px',
  //       borderRadius: '100px',
  //     }}
  //   />
  //   <CardBody>
  //     <div style={{
  //       dispaly: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',

  //     }}
  //     >
  //       <div>
  //         <h5 style={{ textAlign: 'center' }}>
  //           {' '}
  //           {user?.name}
  //           {' '}
  //         </h5>
  //       </div>

  //     </div>

  //     {isEdit ? (
  //       <div>
  //         <Input
  //           name="avatar"
  //           type="file"
  //           accept="image/*"
  //           onChange={changeImg}
  //         />
  //         <Button
  //           onClick={submitHandler}
  //           color="primary"
  //           outline
  //           type="submit"
  //           style={{
  //             marginTop: '10px',
  //             marginBottom: '10px',
  //             marginLeft: '80px',
  //           }}
  //         >
  //           add photo
  //         </Button>
  //       </div>
  //     ) : (
  //       <Button
  //         color="primary"
  //         outline
  //         type="button"
  //         onClick={() => editHandler()}
  //       >
  //         Change

  //       </Button>
  //     ) }

    //   </CardBody>
    // </Card>
    <>
      <Row>
        <Col className="split left">
          {!isEdit ? (
            <Card>
              <img
                alt="Sample"
                src="http://localhost:3001/ZaglushkaClub.jpeg"
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
                <b>о клубе: </b>
                {club?.description}
              </div>
              <div>
                <Button onClick={() => clickHandler()} type="button"> Редактировать иформацию</Button>
              </div>
            </Card>
          ) : (
            <Card>
              <Form>

                <div>
                  <img
                    alt="Sample"
                    src="http://localhost:3001/ZaglushkaClub.jpeg"
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
                    // onChange={changeImg}
                  />
                  <Button
                    // onClick={submitHandler}
                    color="primary"
                    outline
                    type="submit"
                    style={{
                      marginTop: '10px',
                      marginBottom: '10px',
                      marginLeft: '80px',
                    }}
                  >
                    Изменить
                  </Button>

                </div>
                <div>
                  <b>название клуба: </b>
                  <input
                    name="title"
                    value={club?.name}
                    placeholder="Название мероприятия"
                    type="text"
                  />
                </div>
                <div>
                  <b>телефон: </b>
                  <input
                    name="title"
                    value={club?.phone}
                    placeholder="Название мероприятия"
                    type="text"
                  />
                </div>
                <div>
                  <b>электронная почта: </b>
                  <input
                    name="title"
                    value={club?.email}
                    placeholder="Название мероприятия"
                    type="text"
                  />
                </div>
                <div>
                  <b>о клубе: </b>
                  <textarea
                    cols="60"
                    rows="4"
                    name="title"
                    value={club?.description}
                    placeholder="Название мероприятия"
                    type="text"
                  />
                </div>
                <div>
                  <Button onClick={() => clickHandler()} type="button"> Редактировать иформацию</Button>
                </div>
              </Form>
            </Card>
          )}

        </Col>

        <Col className="split right">
          <div>
            {' '}
            <Button
              color="primary"
              outline
              type="button"
              onClick={() => buttonHandler()}
            >
              Новое событие
            </Button>
            События клуба:
            {' '}

            <ul>

              {events?.map((el) => <OneEventCard key={el.id} event={el} />)}
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col />
      </Row>
    </>
  );
}

export default ClubPage;
