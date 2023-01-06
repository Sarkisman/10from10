import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form,
} from 'reactstrap';
import MemberAvatar from '../../ui/MemberAvatar';
import { deleteCounter, getEventCounter, submitCounter } from '../../../redux/actions/counterActions';
import { asyncAddComment, asyncSetComments, setComments } from '../../../redux/actions/CommentsActions';

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
          height: '700px',
          border: '1px solid',
          borderRadius: '20px',
          boxShadow: '5px 5px 10px',
        }}
        >
          <div style={{
            marginTop: '30px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'red',

          }}
          >
            <h1>{counter?.title}</h1>
            <h2>{counter?.description}</h2>
            <h2>
              дата проведения:
              {' '}
              {counter?.date?.slice(0, 10)}
            </h2>
          </div>
          <div style={{
            marginTop: '30px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'red',

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
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'red',

          }}
          >
            <h5>
              место проведения:
              {' '}
              <b>{counter?.Club?.name}</b>
            </h5>
            <h5>{counter?.Club?.address}</h5>
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

              {modal && (
                <div>

                  <Modal
                    isOpen={modal}
                    modalTransition={{ timeout: 700 }}
                    backdropTransition={{ timeout: 1300 }}
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

          </div>
          {filteredComments.length && (
            <div style={{
              marginTop: '30px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid',
            }}
            >
              <ul>
                {filteredComments?.map((el) => (
                  <li key={el.id}>
                    {el.User.avatar}
                    {el.text}
                  </li>
                ))}

              </ul>
            </div>
          )}

        </div>
      </div>
    </div>

  );
}

export default EventPage;
