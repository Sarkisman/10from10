import React from 'react';

export default function MemberAvatar({ user }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid',
        marginRight: '5px',

      }}
      >
        <img
          src={`http://localhost:3001/${user?.avatar}`}
          alt="avatar"
          style={{
            heigh: 'auto',
            width: '100%',
          }}
        />

      </div>
      <div><h6>{user?.name}</h6></div>
    </div>
  );
}
