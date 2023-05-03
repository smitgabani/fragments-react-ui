import React, { useState, useEffect } from 'react';
import { getUserInfo, getUserImage } from '../../api';
import { useSelector } from 'react-redux';

// render user properties after checking if they are not null
// if so redirect to home page
const UserProfile = () => {
  const user = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState({ status: 'not ok', user: {} });
  const [userImage, setUserImage] = useState(null);


  const handleCopyClick = () => {
    navigator.clipboard.writeText(user.idToken);
  };

  useEffect(() => {
    console.dir(user);
    async function getUserData() {
      const user_data = await getUserInfo(user);
      setUserData(user_data);
    }
    async function getUserImageFun() {
      const user_image = await getUserImage(user);
      setUserImage(user_image);
    }
    getUserImageFun();
    getUserData();
  }, [user]);

  return user ? (
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
            <br />
            {userData && (
              <div>
                <b>Name: </b>
                {userData.data.user.firstname + ' ' + userData.data.user.lastname}
                <br />
                <b>Bio: </b>
                {userData.data.user.bio}
                <br />
                <b>Website: </b>
                {userData.data.user.website}
                <br />
                <b>Location: </b>
                {userData.data.user.location}
                <br />
                <button className="btn btn-sm btn-primary pull-xs-right" onClick={handleCopyClick}>
                  Copy access token
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default UserProfile;
