import React, { useState } from 'react';
import classes from './Err.module.css';
import ErrCard from '../../ui/ErrCard';

export default function Err() {
  const developers = [
    { id: 1, name: 'Виктория', avatar: 'Viktoria.jpg' },
    { id: 2, name: 'Саркис', avatar: 'Sarkis.jpg' },
    { id: 3, name: 'Андрей', avatar: 'Andrey.jpg' },
  ];
  const [isDevelopers, setIsDevelopers] = useState(developers);
  const deleteHandler = (id) => {
    setIsDevelopers((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <h1 className={classes.main}>OOOUPS</h1>
        <img className={classes.errorImg} src="http://localhost:3001/404error.png" alt="" />
        <p>
          <h3 className={classes.main}>Произошло недоразумение, но эти ребята не виноваты!!!!</h3>
        </p>
        {' '}
        <div className={classes.avatarFlex}>

          {isDevelopers?.map((el) => <ErrCard deleteHandler={deleteHandler} el={el} key={el.id} />)}
        </div>

      </div>
    </div>

  );
}
