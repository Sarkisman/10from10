import React from 'react';
import { useSelector } from 'react-redux';

export default function LkClub() {
  const club = useSelector((state) => state.club);
  return (
    <div className="content">
      {club.name}
    </div>
  );
}
