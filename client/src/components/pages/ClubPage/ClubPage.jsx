import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClubs } from '../../../redux/actions/ClubActions';
import { getEventsByClub } from '../../../redux/actions/eventActions';
import OneEventCard from '../../ui/OneEventCard/OneEventCard';

function ClubPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const clubs = useSelector((store) => store.clubs); // .find((el) => el.id === id);
  const club = clubs.find((el) => el.id === +id);
  const events = useSelector((store) => store.events);

  useEffect(() => {
    dispatch(getAllClubs());
    dispatch(getEventsByClub(id));
  }, []);

  return (
    <>
      <div>{club?.name}</div>
      <div>
        События клуба:
        <ul>
          {events.map((el) => <OneEventCard key={el.id} event={el} />)}
        </ul>
      </div>
    </>
  );
}

export default ClubPage;
