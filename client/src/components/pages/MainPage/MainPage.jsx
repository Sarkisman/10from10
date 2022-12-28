import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllClubs, getMyClub } from '../../../redux/actions/ClubActions';
import { getAvatar } from '../../../redux/actions/userAvatarAction';
import Map from '../../ui/Map/Map';
// import './style.css';

export default function MainPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(getAvatar());
    dispatch(getAllClubs());
    dispatch(getMyClub(user?.id));
  }, []);
  return (
    <Map />
  );
}
