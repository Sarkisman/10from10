import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Col, Row, UncontrolledCarousel,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getCommentsAction } from '../../../redux/actions/Comments';
import { checkHaveClub, getSingleClub } from '../../../redux/actions/ClubActions';
import UserCard from '../../ui/UserCard';

export default function Lk() {
  const club = useSelector((store) => store.club);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCommentsAction());
    dispatch(getSingleClub());
    dispatch(checkHaveClub(user?.id));
  }, []);

  console.log(club);
  const buttonHandler = () => {
    navigate(`/reg/${user.id}`);
  };
  return (
    <>
      <Row>
        <Col>
          <UserCard />
        </Col>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <Col>
          История комментариев
        </Col>
        <Col>
          Мои события
        </Col>
      </Row>
      <Row>
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
      </Row>
    </>
  );
}
