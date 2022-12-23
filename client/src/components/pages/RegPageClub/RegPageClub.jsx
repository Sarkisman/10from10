import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, Col, Form, Input, Label, Row,
} from 'reactstrap';

export default function ClubOrUser() {
  const { params } = useParams();
  console.log(params);
  // const dispatch = useDispatch();
  // const err = useSelector((store) => store.err);
  return (
    <Form>
      <Row>
        <Col md={{
          offset: 3,
          size: 6,
        }}
        >
          <Label for="exampleEmail">
            Название клуба
          </Label>
          <Input
            name="clubName"
            placeholder="Как называется ваш клуб"
            type="text"
          />
          <Label for="exampleAddress">
            Address
          </Label>
          <Input
            id="exampleAddress"
            name="address"
            placeholder="1234 Main St"
          />
        </Col>
      </Row>
      <Row>
        <Col md={{
          offset: 3,
          size: 6,
        }}
        >
          <Label for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
          />
        </Col>
        <Col md={{
          offset: 3,
          size: 6,
        }}
        >
          <Label for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
          />
        </Col>
      </Row>
      <Row>
        <Col md={{
          offset: 5,
          size: 6,
        }}
        >
          <Row>
            <Label for="examplePassword">
              {' '}
            </Label>
          </Row>
          <Button>
            Sign in
          </Button>
        </Col>
        <Col md={{
          offset: 5,
          size: 6,
        }}
        >
          {/* {err && (<div style={{ color: 'red' }}>{err.message}</div>)} */}
        </Col>
      </Row>
    </Form>
  );
}
