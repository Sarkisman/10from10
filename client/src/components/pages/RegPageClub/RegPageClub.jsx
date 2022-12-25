import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, Col, Form, Input, Label, Row,
} from 'reactstrap';
// import Multiselect from 'multiselect-react-dropdown';
import { getTypesAction } from '../../../redux/actions/ClubActions';

export default function ClubOrUser() {
  // const types = useSelector((state) => state.club_type);
  const dispatch = useDispatch();
  const { params } = useParams();
  console.log(params);
  useEffect(() => {
    dispatch(getTypesAction());
  });
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
        <Row>
          <Col md={{
            offset: 3,
            size: 6,
          }}
          >
            <Label for="exampleEmail">
              Выберите направление(я) вашего стрелкового клуба.
            </Label>
            {/* <Multiselect
              isObject={false}
          // onKeyPressFn={noRefCheck()}
          // onRemove={noRefCheck()}
          // onSearch={noRefCheck()}
          // onSelect={noRefCheck()}
              options={types}
            /> */}
          </Col>
        </Row>
      </Row>
      <Row>
        <Col md={{
          offset: 5,
          size: 6,
        }}
        >
          <Row>
            <Label for="examplePassword" />
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
