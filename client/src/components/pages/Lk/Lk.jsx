import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Col, Row,
} from 'reactstrap'; // UncontrolledCarousel,
import { useNavigate } from 'react-router-dom';
import { getCommentsAction } from '../../../redux/actions/Comments';
import { getAvatar } from '../../../redux/actions/userAvatarAction';
import NewUserCard from '../../ui/NewUserCard';
import { checkHaveClub, getSingleClub } from '../../../redux/actions/ClubActions';
import { getEventsByUser } from '../../../redux/actions/eventActions';
import OneEventCard from '../../ui/OneEventCard/OneEventCard';

export default function Lk() {
  const club = useSelector((store) => store.club);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvatar());
    dispatch(getCommentsAction());
    dispatch(getSingleClub());
  }, []);
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.events);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCommentsAction());
    dispatch(getSingleClub());
    dispatch(checkHaveClub(user?.id));
    dispatch(getEventsByUser(user?.id));
  }, []);
  const buttonHandler = () => {
    navigate(`/reg/${user.id}`);
  };
  return (
    <>
      <Row>
        <Col>
          <NewUserCard />
          <Col>
            {club ? (
              <Button
                color="primary"
                outline
                type="button"
                onClick={() => navigate(`/club/${club?.id}`)}
              >
                Мой клуб:
                {'  '}
                {club?.name}
              </Button>
            ) : (
              <Button
                color="primary"
                outline
                type="button"
                onClick={() => buttonHandler()}
              >
                Подать заявку на регистрацию клуба.
              </Button>
            )}

          </Col>
        </Col>
        {/* <Col>
          <div>моя фотогалерея</div>
          <UncontrolledCarousel
            items={[
              {
                altText: 'Slide 1',
                caption: 'Slide 1',
                key: 1,
                src: 'https://picsum.photos/id/123/1200/600',
              },
              {
                altText: 'Slide 2',
                caption: 'Slide 2',
                key: 2,
                src: 'https://picsum.photos/id/456/1200/600',
              },
              {
                altText: 'Slide 3',
                caption: 'Slide 3',
                key: 3,
                src: 'https://picsum.photos/id/678/1200/600',
              },
            ]}
          />
        </Col> */}
        {' '}
        <Col>
          Мои события
          {events?.map((event) => <OneEventCard key={event.id} event={event} />)}
        </Col>
      </Row>
      <Row>
        <Col>
          История комментариев
        </Col>

      </Row>
      <Row />
    </>
  );
}
