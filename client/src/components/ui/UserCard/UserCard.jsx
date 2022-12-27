import React, { useState, useEffect } from 'react';
import {
  Button,
  Card, CardBody, CardTitle, Input,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAvatar, setUserAavatar } from '../../../redux/actions/userAvatarAction';

export default function UserCard() {
  const user = useSelector((store) => store.user);
  const defaultAvatar = useSelector((store) => store.userAvatar);
  console.log(defaultAvatar);
  const dispatch = useDispatch();
  console.log('defaultAvatar:', defaultAvatar);
  useEffect(() => {
    dispatch(getAvatar());
  }, [defaultAvatar]);

  const [avatar, setAvatar] = useState(defaultAvatar);
  console.log('avatar:', avatar);
  const formdata = new FormData();
  formdata.append('avatar', avatar);

  const submitHandler = () => {
    dispatch(setUserAavatar(formdata));
    setAvatar(dispatch(getAvatar()));
  };
  return (

    <Card
      style={{

        width: '300px',
        dispaly: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <img
        alt="Sample"
        src={`http://localhost:3001/${avatar}`} // image={`http://localhost:3001/lk/${avatar}`}
        style={{
          marginTop: '10px',
          width: '250px',
          heigh: '300px',
          borderRadius: '100px',
        }}
      />
      <CardBody>
        <CardTitle
          style={{
            marginLeft: '50px',
          }}
          tag="h5"
        >
          hello
          {' '}
          {user.name}
          {' '}
          {user.id}
        </CardTitle>
        {/* <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Card subtitle
        </CardSubtitle>
        <CardText>
          Some quick example tex up the bulk of the card‘s content.
        </CardText> */}
        <div>
          <Input
            name="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setAvatar(file);
            }}
          />
        </div>
        <Button
          onClick={() => submitHandler()}
          color="primary"
          outline
          type="submit"
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: '80px',
          }}

        >
          add photo
        </Button>
      </CardBody>
    </Card>
  );
}
