import React, { useState, useEffect } from 'react';
import {
  Button,
  Card, CardBody, CardTitle, Input,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAvatar } from '../../../redux/actions/userAvatarAction';

export default function NewUserCard() {
  const [fileData, setFileData] = useState({ avatar: null });
  const user = useSelector((store) => store.user);
  const [avatar, setAvatar] = useState(user?.avatar || 'Zaglushka.jpeg');
  const dispatch = useDispatch();

  console.log('user:', user);
  console.log('avatar:', avatar);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user?.avatar);
    }
  }, [user]);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', fileData.avatar);
    dispatch(setUserAvatar(data));
  };

  const changeImg = (e) => {
    setFileData({ [e.target.name]: e.target.files[0] });
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
          {user?.name}
          {' '}
          {user?.id}
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
            onChange={changeImg}
          />
        </div>
        <Button
          onClick={submitHandler}
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
