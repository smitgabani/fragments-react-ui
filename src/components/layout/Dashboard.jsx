import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserFragments } from '../../api';
import { useNavigate } from 'react-router-dom';
import { deleteFragment } from '../../api';

function Item({ fragment }) {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      const deleted = await deleteFragment(user, fragment.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card">
      <h6 className="card-title">ID: {fragment.id}</h6>
      <div className="card-body">
        <p className="card-text">Created: {new Date(fragment.created).toLocaleString()}</p>
        <p className="card-text">Updated: {new Date(fragment.updated).toLocaleString()}</p>
        <p className="card-text">Size: {fragment.size}</p>
        <p className="card-text">Type: {fragment.type}</p>
      </div>
      <button
        className="btn btn-sm btn-primary pull-xs-right"
        onClick={() => {
          navigate(`/fragment/update/${fragment.id}`);
        }}
      >
        Update
      </button>
      <button
        className="btn btn-sm btn-primary pull-xs-right"
        onClick={() => {
          handleDeleteClick();
        }}
      >
        Delete
      </button>
      <button
        className="btn btn-sm btn-primary pull-xs-right"
        onClick={() => {
          navigate(`/fragment/${fragment.id}`);
        }}
      >
        View
      </button>
    </div>
  );
}

export default function Dashboard() {
  const user = useSelector((state) => state.user.value);
  const [userFragments, setUserFragments] = useState({ status: 'not ok', fragments: [] });
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const fragments_data = await getUserFragments(user, 1);
      setUserFragments(fragments_data);
    }
    getUserData();
  }, [user]);

  return user ? (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
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

            <button
              className="btn btn-lg btn-primary"
              onClick={() => {
                navigate(`/create`);
              }}
            >
              Create a Fragment
            </button>
            <br />
            <br />
            <h4>Here are all your fragments: </h4>

            {userFragments &&
              userFragments.data.fragments.map((fragment) => (
                <Item key={fragment.id} fragment={fragment} />
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
