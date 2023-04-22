import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../features/user';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../UserPool';
export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(username, password)
      .then((data) => {
        console.log(data);
        dispatch(
          appLogin({
            email: data.idToken.payload.email,
            username: data.accessToken.payload.username,
            idToken: data.idToken.jwtToken,
            accessToken: data.accessToken.jwtToken,
            refreshToken: data.refreshToken.token,
          })
        );
      })
      .catch((err) => {
        console.error('Failed to login!', err);
      });
    setUsername('');
    setPassword('');
    navigate({
      pathname: '/',
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <div>Create a new account.</div>
            </p>

            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </fieldset>

                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled="">
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
