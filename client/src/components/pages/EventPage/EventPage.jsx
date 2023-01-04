import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
// import { getEvents } from '../../../redux/actions/eventActions';
import MemberAvatar from '../../ui/MemberAvatar';
import { deleteCounter, getEventCounter, submitCounter } from '../../../redux/actions/counterActions';

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventCounter(id));
    // dispatch(getEvents());
  }, []);
  const counter = useSelector((store) => store.counter);
  const eventUsers = useSelector((store) => store.eventUsers);

  // const eventUsers = counter.Users;
  // const events = useSelector((store) => store.events); // .find((el) => el.id === id);
  // const event = events.find((el) => el.id === +id);
  // console.log('MyCOUNTERRRRRRRRRRRR', counter);

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
            <h5>участники</h5>
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
          <div style={{ // const events = useSelector((store) => store.events); // .find((el) => el.id === id);
            // const event = events.find((el) => el.id === +id);
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
              клуб:
              {' '}
              {counter?.Club?.name}
            </h5>
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
              {/* {console.log(!eventUsers?.filter((el) => el.id === user.id))} */}
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

            </div>

          </div>

        </div>

      </div>
    </div>

  );
}

export default EventPage;
