import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Col, Form, Input, Label, Row, Button,
} from 'reactstrap';
import { submitEvent } from '../../../redux/actions/eventActions';

export default function NewClubEventPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  return (
    <Form onSubmit={(e) => dispatch(submitEvent(e, Object.fromEntries(new FormData(e.target)), id))}>
      <Row>
        <Col md={{
          offset: 3,
          size: 6,
        }}
        >
          <Label for="exampleEmail">
            Название мероприятия
          </Label>
          <Input
            name="title"
            placeholder="Название мероприятия"
            type="text"
          />
          <Label for="exampleAddress">
            Описание
          </Label>
          <Input
            id="exampleAddress"
            name="description"
            placeholder="описание мероприятия"
          />
          <Label for="exampleAddress">
            Количество участников
          </Label>
          <Input
            id="exampleAddress"
            name="num_of_members"
            placeholder="количество участников"
          />
          <Label for="exampleAddress">
            Выберите дату
          </Label>
          <Input
            bsSize="lg"
            type="date"
            name="date"
          />
          <Button type="submit">
            Отправить
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
