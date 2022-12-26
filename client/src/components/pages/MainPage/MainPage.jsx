import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllClubs } from '../../../redux/actions/ClubActions';
import Map from '../../ui/NavBar/Map/Map';
// import './style.css';

export default function MainPage() {
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(getAllClubs());
  }, []);
  return (
    <Map />
  );
}
