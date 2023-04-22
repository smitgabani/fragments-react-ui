import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verify } from '../../UserPool';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();

    verify(code, username);
    setCode('');
    navigate({
      pathname: '/login',
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Verify email address for {username}</h1>
            <p className="text-xs-center">
              <div>Check you email inbox.</div>
            </p>

            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Verification code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                  />
                </fieldset>

                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled="">
                  Verify
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
