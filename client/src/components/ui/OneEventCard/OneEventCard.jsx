import React from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, CardText, Button,
} from 'reactstrap';
import './OneCard.css';

export default function OneEventCard({ event }) {
  return (
    <Card
      style={{
        marginTop: '20px',
        width: '500px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <div style={{
        width: '100px',
        heigh: '100px',
        overflow: 'hidden',
        margin: 'auto 15px',
      }}
      >
        <img
          src="http://localhost:3001/ZaglushkaEvent.png"
          alt="mishen"
          style={{
            heigh: 'auto',
            width: '100%',
          }}
        />
      </div>

      <CardBody>
        <CardTitle tag="h5">
          {event.title}
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          количество участников:
          {' '}
          {}
          {event.num_of_members}
        </CardSubtitle>
        <CardText>
          {event.description}
        </CardText>
        <CardText>
          дата проведения:
          {' '}
          {event?.date?.slice(0, 10)}
        </CardText>
        {/* <button type="button" className="btn">❤️</button> */}
        <Button
          color="primary"
          outline
          style={{
            marginLeft: '50px',

          }}
        >
          Подробнее
        </Button>
      </CardBody>

    </Card>
  );
}
