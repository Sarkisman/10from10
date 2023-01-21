import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Form, Input, Label, Row,
} from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
import { errEmptyAction, regAction } from '../../../redux/actions/UserActions';
// import { getSingleClub } from '../../../redux/actions/ClubActions';

export default function AuthPage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(errEmptyAction());
  }, []);
  const err = useSelector((store) => store.err);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

    }}
    >
      <div style={{
        padding: '50px',
        position: 'relative',
        top: '100px',

        width: '600px',
        height: '400px',
        border: '1px solid black',
        borderRadius: '30px',
        boxShadow: '5px 5px 10px',
        backgroundColor: 'rgba(255,255,255,0.8)',

      }}
      >
        <Form onSubmit={(e) => dispatch(regAction(e, Object.fromEntries(new FormData(e.target))))}>
          <Row>
            <Col md={{
              offset: 2,
              size: 8,
            }}
            >

              <Input
                id="exampleEmail"
                name="name"
                placeholder="Username"
                type="text"
                style={{
                  position: 'relative',
                  top: '40px',

                }}

              />
            </Col>
          </Row>
          <Row>
            <Col md={{
              offset: 2,
              size: 8,
            }}
            >

              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="mail"
                style={{
                  position: 'relative',
                  top: '80px',
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{
              offset: 2,
              size: 8,
            }}
            >

              <Input
                id="examplePassword"
                name="password"
                placeholder="password"
                type="password"
                style={{
                  position: 'relative',
                  top: '120px',
                }}
              />
            </Col>
          </Row>
          <Col
            sm={{
              offset: 3,
            }}
          >
            {err && (
            <div style={{
              color: 'red',
              position: 'relative',
              top: '130px',
            }}
            >
              {err.message}
            </div>
            )}
          </Col>

          {' '}
          <Label
            className="visually"
          />
          <Col
            sm={{
              offset: 4,
            }}
          >
            <Button
              color="primary"
              outline
              type="submit"
              style={{
                position: 'relative',
                top: '120px',
              }}
            >
              Зарегистрироваться
            </Button>
          </Col>
        </Form>
        <Row />
      </div>
    </div>
  );
}
