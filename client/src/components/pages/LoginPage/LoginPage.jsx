import React, { useEffect } from 'react'; // useContext
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Form, Input, Row,
} from 'reactstrap';
import { errEmptyAction, loginAction } from '../../../redux/actions/UserActions';

export default function AuthPage() {
  const dispatch = useDispatch();
  const err = useSelector((store) => store.err);

  useEffect(() => {
    dispatch(errEmptyAction());
  }, []);
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
        top: '200px',

        width: '600px',
        height: '400px',
        border: '1px solid black',
        borderRadius: '30px',
        boxShadow: '5px 5px 10px',
      }}
      >

        <Form onSubmit={(e) => dispatch(
          loginAction(e, Object.fromEntries(new FormData(e.target))),
        )}
        >
          <Row>
            <Col md={{
              offset: 2,
              size: 8,
            }}
            >
              {/* <Label for="examplePassword">
                Name
              </Label> */}
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
              {/* <Label for="examplePassword">
                Password
              </Label> */}
              <Input
                id="examplePassword"
                name="password"
                placeholder="123"
                type="password"
                style={{
                  position: 'relative',
                  top: '80px',
                }}
              />
            </Col>
          </Row>
          <Row>

            <Col sm={{
              offset: 5,
            }}
            >
              <Button
                style={{
                  position: 'relative',
                  top: '150px',
                }}
                color="primary"
                outline
                type="submit"
              >
                Войти
              </Button>
            </Col>
          </Row>

        </Form>

        <Row style={{
          position: 'relative',
          top: '50px',

        }}
        >
          <Col sm={{
            offset: 2,
          }}
          >
            {' '}
            {err && (
            <div style={{ color: 'red' }}>
              {err.message}
            </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
