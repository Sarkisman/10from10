import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Card,
} from 'reactstrap';
import MemberAvatar from '../../ui/MemberAvatar';
import { deleteCounter, getEventCounter, submitCounter } from '../../../redux/actions/counterActions';
import { asyncAddComment, asyncSetComments, setComments } from '../../../redux/actions/CommentsActions';
import classes from './EventPage.module.css';

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState('');
  const comments = useSelector((store) => store.comments);
  const filteredComments = comments?.filter((el) => el.event_id === +id);
  console.log('filtered', filteredComments);
  // const [eventComments, setEventComments] = useState(filteredComments);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getEventCounter(id));
    dispatch(asyncSetComments());
  }, []);
  const counter = useSelector((store) => store.counter);
  const eventUsers = useSelector((store) => store.eventUsers);
  const user = useSelector((store) => store.user);

  const submitHandler = () => {
    dispatch(submitCounter(id));
  };

  const deleteHandler = () => {
    dispatch(deleteCounter(user.id, id));
  };

  const clubPageHandler = () => {
    navigate(`/club/${counter.club_id}`);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <div>

        <div style={{
          width: '900px',
          height: 'auto',
          border: '3px solid',
          borderRadius: '20px',
          padding: '0px 5px 30px 5px',
          boxShadow: '5px 5px 10px',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
        >
          <div style={{
            marginTop: '10px',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <h1>{counter?.title}</h1>
            <h2>{counter?.description}</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            >
              <div>
                {' '}
                <h5>
                  место проведения:
                  {' '}
                  <b>{counter?.Club?.name}</b>
                </h5>
                <h5>{counter?.Club?.address}</h5>

              </div>
              <div>
                <h2>
                  дата проведения:
                  {' '}
                  {counter?.date?.slice(0, 10)}
                </h2>

              </div>

            </div>
          </div>
          <div style={{
            marginTop: '30px',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',

          }}
          >
            <h5>участники:</h5>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            >
              {eventUsers?.map((el) => <MemberAvatar user={el} key={el.id} />)}
            </div>

          </div>
          <div style={{
            marginTop: '10px',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',

          }}
          >
            {/* <h5>
              место проведения:
              {' '}
              <b>{counter?.Club?.name}</b>
            </h5>
            <h5>{counter?.Club?.address}</h5> */}
            {/* <div>
              <h6>{club.name}</h6>
              <h6>{club.phone}</h6>
              <h6>{club.email}</h6>
              <h6>{club.description}</h6>
              <h6>{club.adress}</h6>
            </div> */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
            >
              {' '}
              <Button
                onClick={clubPageHandler}
                color="primary"
                outline
              >
                о клубе
              </Button>
              {!(eventUsers?.filter((el) => el.id === user.id).length)
                ? (
                  <Button
                    onClick={submitHandler}
                    style={{ marginLeft: '10px' }}
                    color="primary"
                    outline
                  >
                    принять участие
                  </Button>
                )
                : (
                  <Button
                    onClick={deleteHandler}
                    style={{ marginLeft: '10px' }}
                    color="primary"
                    outline
                  >
                    отменить участие
                  </Button>
                )}
              <Button
                onClick={toggle}
                style={{ marginLeft: '10px' }}
                color="primary"
                outline
              >
                добавить комментарий
              </Button>
              <Button
                onClick={() => navigate(-1)}
                style={{ marginLeft: '10px' }}
                color="primary"
                outline
              >
                назад
              </Button>

              {modal && (
                <div>

                  <Modal
                    isOpen={modal}
                    modalTransition={{ timeout: 0 }}
                    backdropTransition={{ timeout: 400 }}
                    toggle={toggle}
                  // className={className}
                  >
                    <ModalHeader toggle={toggle}>Добавить комментарий:</ModalHeader>
                    <ModalBody>
                      <Form
                        className="mb-3 mt-3"
                        onSubmit={(e) => {
                          e.preventDefault();
                          dispatch(asyncAddComment(e, input, id));
                          setInput('');
                          toggle();
                        }}
                      >

                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          name="text"
                          placeholder="Ваш комментарий"
                          id="text"
                        />
                        <ModalFooter>
                          <Button type="submit" color="primary">
                            Добавить
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

            </div>
            {filteredComments && (
              <div style={{
                marginTop: '30px',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              >
                  {filteredComments?.map((el) => (
                    <Card className={classes.mainCard} key={el.id}>
                      <div className={classes.card}>
                        <div className={classes.container}>
                          <div className={classes.secondContainer}>
                            <img
                              src={`http://localhost:3001/${el.User.avatar}`}
                              alt="avatar"
                              className={classes.img}
                            />
                          </div>
                        </div>
                        <div className={classes.content}>
                          <p>
                            {el?.User?.name}
                            {' '}
                            в
                            {' '}
                            {el?.createdAt.slice(0, 16).replace('T', ' ').split(' ').reverse()
                              .join(' ')}
                          </p>
                          {el?.text}
                        </div>
                      </div>

                    </Card>
                  ))}
              </div>

            )}
          </div>

        </div>
      </div>
    </div>

  );
}

export default EventPage;
