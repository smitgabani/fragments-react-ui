import React from 'react';
import { useSelector } from 'react-redux';

// render user properties after checking if they are not null
// if so redirect to home page
const UserProfile = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="" className="user-img" alt="" />
              <h4>{user.username}</h4>
              <p>Email: {user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            idToken: {user.idToken}
            <br />
            <br />
            accessToken: {user.accessToken}
            <br />
            <br />
            refreshToken: {user.refreshToken},<br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
