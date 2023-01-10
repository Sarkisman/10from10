import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllClubs, checkHaveClub } from '../../../redux/actions/ClubActions';
import { getAvatar } from '../../../redux/actions/userAvatarAction';
import Map from '../../ui/Map/Map';
// import './style.css';

export default function MainPage({ isRender, setIsRender }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(getAvatar());
    dispatch(getAllClubs());
    dispatch(checkHaveClub(user?.id));
  }, []);
  return (
    <Map isRender={isRender} setIsRender={setIsRender} />
  );
}
