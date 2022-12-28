import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../../redux/actions/eventActions';

function EventPage() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const events = useSelector((store) => store.events); // .find((el) => el.id === id);
  console.log(events);
  const event = events.find((el) => el.id === +id);
  console.log(event);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div>{event?.title}</div>
  );
}

export default EventPage;
