import React from 'react';

import './OneCard.css';

export default function OneEventCard({ event }) {
  return (
    <div className="post-dog-card-container">
      {/* <div className="posted-dog-Img">
        <img src={event.image} alt="Some Hero" className="CatImg" />
      </div> */}
      <div className="text">
        <span>{event.title}</span>
      </div>
      <div className="text">
        <span>
          дата проведения:
          {' '}
          {event.date}
        </span>
      </div>
      <div className="text">
        <span>
          свободных мест
          {' '}
          {event.num_of_members}
        </span>
      </div>
      <div className="buttons">
        <button type="button" className="btn">❤️</button>
      </div>
    </div>
  );
}
