import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Row,
} from 'reactstrap';
import { getAllClubs } from '../../../redux/actions/ClubActions';
import { getEventsByClub } from '../../../redux/actions/eventActions';
import OneEventCard from '../../ui/OneEventCard/OneEventCard';

function ClubPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const clubs = useSelector((store) => store.clubs); // .find((el) => el.id === id);
  const club = clubs.find((el) => el.id === +id);
  const events = useSelector((store) => store.events);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllClubs());
    dispatch(getEventsByClub(id));
  }, []);

  const buttonHandler = () => {
    navigate(`/event/new/${club.id}`);
  };

  return (
    <>
      <Row>
        <Col>
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
        </Col>

        <Col>
          <div>
            События клуба:
            <ul>
              {events.map((el) => <OneEventCard key={el.id} event={el} />)}
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>

          <Button
            color="primary"
            outline
            type="button"
            onClick={() => buttonHandler()}
          >
            Создать событие
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ClubPage;
