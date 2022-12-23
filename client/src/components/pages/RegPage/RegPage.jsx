import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Form, Input, Label, Row,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { regAction } from '../../../redux/actions/UserActions';

export default function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const err = useSelector((store) => store.err);
  return (
    <Col>

      <Col>
        <Form onSubmit={(e) => dispatch(regAction(e, Object.fromEntries(new FormData(e.target))))}>
          <Row>
            <Col md={{
              offset: 3,
              size: 6,
            }}
            >
              <Label for="examplePassword">
                Name
              </Label>
              <Input
                id="exampleEmail"
                name="name"
                placeholder="Username"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col md={{
              offset: 3,
              size: 6,
            }}
            >
              <Label for="examplePassword">
                Mail
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="mail"
              />
            </Col>
          </Row>
          <Row>
            <Col md={{
              offset: 3,
              size: 6,
            }}
            >
              <Label
                className="visually"
              >
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="123"
                type="password"
              />
            </Col>
          </Row>
          {' '}
          <Label
            className="visually"
          />
          <Col
            sm={{
              offset: 5,
            }}
          >

            <Button type="submit">
              Submit
            </Button>
          </Col>
        </Form>
        <Row>
          <Col
            sm={{
              offset: 4,
            }}
          >
            {err && (<div style={{ color: 'red' }}>{err.message}</div>)}
          </Col>
        </Row>

      </Col>
      <Button
        color="warning"
        onClick={() => navigate('/reg/club')}
      >
        Зарегистроваться как клуб!
      </Button>
    </Col>
  );
}
