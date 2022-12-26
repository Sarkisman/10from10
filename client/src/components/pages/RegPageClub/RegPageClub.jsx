import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, Col, Form, Input, Label, Row,
} from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import { getTypesAction, sendClubAvatar, sendDataClub } from '../../../redux/actions/ClubActions';

export default function ClubOrUser() {
  // const selectRef = useRef(null);
  const [select, setSelect] = useState([]);
  const [avatar, setAvatar] = useState();
  // console.log(avatar);
  const types = useSelector((state) => state.types);
  console.log(types);
  const dispatch = useDispatch();
  const { params } = useParams();
  useEffect(() => {
    dispatch(getTypesAction());
  }, []);

  // const postFile = (file) => {
  //   setAvatar(file);
  //   // const formdata = new FormData();
  //   // formdata.append('file', file);
  //   // console.log(file);
  // };
  const formdata = new FormData();
  formdata.append('avatar', avatar);
  console.log('formdata:', formdata);
  console.log('avatar:', avatar);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(sendDataClub(
      {
        user_id: params, input: Object.fromEntries(new FormData(e.target)), select,
      },
    ));
    dispatch(sendClubAvatar(formdata, params));
  };
  return (
    <Form onSubmit={(e) => submitHandler(e)}>
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
        <Row>
          <Col md={{
            offset: 3,
            size: 7,
          }}
          >
            <Label for="exampleEmail">
              Выберите направление(я) вашего стрелкового клуба.
            </Label>
            <Multiselect
              // name="types"
              displayValue="club_type"
              isObject
          // onKeyPressFn={noRefCheck()}
          // onRemove={noRefCheck()}
          // onSearch={noRefCheck()}
              onSelect={(e) => setSelect(() => [...e])}
              options={types}
            />
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
          <Input
            name="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setAvatar(file);
            }}
          />
          <Button type="submit">
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
