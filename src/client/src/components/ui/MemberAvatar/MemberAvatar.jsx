import React from 'react';
import classes from './MemberAvatar.module.css';

export default function MemberAvatar({ user }) {
  return (
    <div className={classes.container}>
      <div className={classes.secondContainer}>
        <img
          src={`http://localhost:3001/${user?.avatar}`}
          alt="avatar"
          className={classes.img}
        />

      </div>
      <div><h6>{user?.name}</h6></div>
    </div>
  );
}
