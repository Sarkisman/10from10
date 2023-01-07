import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Col, Form, Input, Label, Row, Button,
} from 'reactstrap';
import { submitEvent } from '../../../redux/actions/eventActions';

export default function NewClubEventPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    dispatch(submitEvent(e, Object.fromEntries(new FormData(e.target)), id));
    navigate(`/club/${id}`);
  };

  return (
    <Form onSubmit={submitHandler}>
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
            type="textarea"
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
          <Input type="date" name="date" min="2023-01-13" max="2024-06-08" />
          {/* <Input name="date" type="date" /> */}
          <Button type="submit">
            Отправить
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
