import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../features/user';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../UserPool';

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError('Password must contain at least one uppercase letter.');
    } else if (!/[a-z]/.test(value)) {
      setPasswordError('Password must contain at least one lowercase letter.');
    } else if (!/[0-9]/.test(value)) {
      setPasswordError('Password must contain at least one number.');
    } else {
      setPasswordError('');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (passwordError) {
      return;
    }

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
        setUsername('');
        setPassword('');
        navigate({
          pathname: '/dashboard',
        });
      })
      .catch((err) => {
        console.error('Failed to login!', err);
        setPasswordError('Invalid Password or Username.');
      });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <div className="text-xs-center">
              <div>Sign in a registered account.</div>
            </div>

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
                    className={`form-control form-control-lg ${passwordError ? 'is-invalid' : ''}`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      validatePassword(event.target.value);
                    }}
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
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
