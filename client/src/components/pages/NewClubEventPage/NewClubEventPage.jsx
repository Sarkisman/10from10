import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Col, Form, Input, Label, Row, Button,
} from 'reactstrap';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import classes from './NewClubEventPage.module.css';
import { submitEvent } from '../../../redux/actions/eventActions';

export default function NewClubEventPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    dispatch(submitEvent(e, Object.fromEntries(new FormData(e.target)), id));
    navigate(`/club/${id}`);
  };
  const today = new Date();
  const date = today.toISOString();
  return (
    <div className={classes.container}>
      <div className={classes.closeButton}>
        <IconButton
          color="inherit"
          onClick={() => navigate(-1)}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <div className={classes.banerContainer}>

        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={{
              offset: 2,
              size: 8,
            }}
            >
              <Input
                className={classes.inputs}
                name="title"
                placeholder="Название мероприятия"
                type="text"
              />
              <Input
                className={classes.discription}
                type="textarea"
                id="exampleAddress"
                name="description"
                placeholder="Описание мероприятия"
              />
              <Input
                id="exampleAddress"
                name="num_of_members"
                placeholder="Количество участников"
              />
              <Label for="exampleAddress">
                Выберите дату
              </Label>
              <Input type="date" name="date" min={date.slice(0, 10)} max="2025-01-10" />
              {/* "2022-01-10" {date.slice(0, 10)} */}
              <Label for="exampleAddress">
                Время начала мероприятия
              </Label>
              <Input type="time" name="time" />
              <Button
                color="primary"
                outline
                className={classes.button}
              >
                Отправить
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
