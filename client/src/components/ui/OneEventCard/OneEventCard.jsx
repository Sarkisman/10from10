import React from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, CardText, Button,
} from 'reactstrap';
import './OneCard.css';
import { useNavigate } from 'react-router-dom';

export default function OneEventCard({ event }) {
  const navigate = useNavigate();
  const buttonHandler = () => {
    navigate(`/events/club/${event.id}`);
  };
  const data = event?.date?.slice(0, 10).split('-').reverse().join('.');
  return (
    <Card
      style={{
        marginTop: '20px',
        width: '500px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.9)',
      }}
    >
      <div style={{
        width: '120px',
        heigh: '120px',
        overflow: 'hidden',
        margin: 'auto',
        marginLeft: ' 15px',
      }}
      >
        <img
          src="http://localhost:3001/ZaglushkaEvent.png"
          alt="mishen"
          style={{
            heigh: '100px',
            width: '100px',
          }}
        />
      </div>

      <CardBody style={{ width: '400px' }}>
        <CardTitle tag="h5">
          {event.title}
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          количество участников:
          {' '}
          { }
          {event.num_of_members}
        </CardSubtitle>
        <CardText>
          {event.description}
        </CardText>
        <CardText>
          Когда:
          {' '}
          <b>{data}</b>
          <p>
            Во сколько:
            {' '}
            <b>{event?.time?.slice(0, 5)}</b>
          </p>
          {' '}

        </CardText>
        {/* <button type="button" className="btn">❤️</button> */}
        <Button
          onClick={() => buttonHandler()}
          color="primary"
          outline
          style={{
            marginLeft: '5rem',

          }}
        >
          Подробнее
        </Button>
      </CardBody>

    </Card>
  );
}
