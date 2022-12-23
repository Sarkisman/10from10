import React, {} from 'react'; // useContext
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Form, Input, Label, Row,
} from 'reactstrap';
import { loginAction } from '../../../redux/actions/UserActions';

export default function AuthPage() {
  const dispatch = useDispatch();
  const err = useSelector((store) => store.err);
  return (
    <>
      <Row>
        <Form onSubmit={(e) => dispatch(
          loginAction(e, Object.fromEntries(new FormData(e.target))),
        )}
        >
          <Row className="row-cols-lg-auto g-3 align-items-center">
            <Col>
              <Label
                className="visually-hidden"
                for="exampleEmail"
              >
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="name"
                placeholder="name"
                type="text"
              />
            </Col>
            <Col>
              <Label
                className="visually-hidden"
                for="examplePassword"
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
            <Col>
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>

      </Row>
      <Row>
        {' '}
        {err && (<div>{err.message}</div>)}
      </Row>
    </>
  );
}
