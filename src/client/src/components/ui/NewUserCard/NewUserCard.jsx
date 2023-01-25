import React, { useState, useEffect } from 'react';
import {
  Button,
  Card, CardBody, Input,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAvatar } from '../../../redux/actions/userAvatarAction';

export default function NewUserCard() {
  const user = useSelector((store) => store.user);
  const [isEdit, setIsEdit] = useState(false);
  const [fileData, setFileData] = useState({ avatar: null });
  const [avatar, setAvatar] = useState(user?.avatar || 'Zaglushka.jpeg');

  const dispatch = useDispatch();

  const editHandler = () => {
    setIsEdit((prev) => !prev);
  };

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
    editHandler();
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
        backgroundColor: 'rgba(255,255,255,0.9)',
      }}
    >
      <img
        alt="Sample"
        src={`http://localhost:3001/${avatar}`}
        style={{
          marginTop: '10px',
          width: '250px',
          heigh: '300px',
          borderRadius: '100px',
        }}
      />
      <CardBody>
        <div style={{
          dispaly: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}
        />

        {isEdit ? (
          <div>
            <Input
              name="avatar"
              type="file"
              accept="image/*"
              onChange={changeImg}
            />
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
          </div>
        ) : (
          <Button
            color="link"
            outline
            type="button"
            onClick={() => editHandler()}
            style={{ color: 'blue' }}
          >
            Change Photo

          </Button>
        ) }
        <div>
          <h5 style={{ textAlign: 'center' }}>
            {' '}
            {user?.name}
            {' '}
          </h5>
        </div>

      </CardBody>
    </Card>
  );
}
