import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../UserPool';

export default function Register() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

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

    if (emailError || passwordError) {
      return;
    }

    signUp(email, username, password);
    setUsername('');
    setEmail('');
    setPassword('');
    navigate({
      pathname: '/verify',
      search: `?username=${username}`,
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <div className="text-xs-center">
              <div>Have an account?</div>
            </div>

            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      validateEmail(event.target.value);
                    }}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
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
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
