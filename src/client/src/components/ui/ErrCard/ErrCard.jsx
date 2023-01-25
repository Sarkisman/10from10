import React from 'react';
import { Button } from 'reactstrap';
import classes from './ErrCard.module.css';

export default function ErrCard({ el, deleteHandler }) {
  return (
    <div className={classes.container}>
      <div className={classes.secondContainer}>
        <img
          src={`/${el?.avatar}`}
          alt="avatar"
          className={classes.img}
        />
      </div>
      <Button
        onClick={() => { deleteHandler(el.id); }}
        className={classes.button}
        color="primary"
      >
        {el?.name}
      </Button>
    </div>
  );
}
