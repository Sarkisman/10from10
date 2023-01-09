import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Col, Row,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getAvatar } from '../../../redux/actions/userAvatarAction';
import NewUserCard from '../../ui/NewUserCard';
import { checkHaveClub, getSingleClub } from '../../../redux/actions/ClubActions';
import { getEventsByUser } from '../../../redux/actions/eventActions';
import OneEventCard from '../../ui/OneEventCard/OneEventCard';
import styles from './LK.module.css';

export default function Lk() {
  const { id } = useParams();
  const club = useSelector((store) => store.club);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvatar());
    dispatch(getSingleClub());
  }, []);
  const user = useSelector((store) => store.user);

  const events = useSelector((store) => store.events);
  const navigate = useNavigate();
  if (user.id === id) (navigate(`http://localhost:3000/lk/${user.id}`));
  useEffect(() => {
    dispatch(getSingleClub());
    dispatch(checkHaveClub(user?.id));
    dispatch(getEventsByUser(user?.id));
  }, []);
  const buttonHandler = () => {
    navigate(`/reg/${user.id}`);
  };
  return (
    <Row>
      <Col md={{ offset: 1, size: 5 }}>
        <NewUserCard />
        <Col>
          {club ? (
            <Button
              style={{
                width: '300px',
                marginTop: '20px',
                color: 'white',
              }}
              color="primary"
              type="button"
              onClick={() => navigate(`/club/${club?.id}`)}
            >
              Мой клуб:
              {'  '}
              {club?.name}
            </Button>
          ) : (
            <Button
              style={{ marginTop: '20px' }}
              color="primary"
              type="button"
              onClick={() => buttonHandler()}
            >
              Подать заявку на регистрацию клуба.
            </Button>
          )}

        </Col>
      </Col>
      <Col>
        <div className={styles.eventbaner}>Мои события</div>
        {events?.map((event) => <OneEventCard key={event.id} event={event} />)}
      </Col>
    </Row>
  );
}
