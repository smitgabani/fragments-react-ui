import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appLogout, appLogin } from '../../features/user';
import { logout } from '../../UserPool';
import { useNavigate } from 'react-router-dom';

function LoggedOutView() {
  if (true)
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>
      </ul>
    );
}

function LoggedInView({ user, logout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li
        className="nav-item"
        onClick={() => {
          dispatch(appLogout());
          logout();
          navigate(`/`);
        }}
      >
        <div className="nav-link">Logout</div>
      </li>

      <li className="nav-item">
        <Link to={`/dashboard`} className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item" style={{ paddingLeft: 100 }}>
        <Link to={`/user/${user.username}`} className="nav-link">
          {user.username}
        </Link>
      </li>
    </ul>
  );
}

export default function Header() {
  const user = useSelector((state) => state.user.value);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Fragments UI
        </Link>
        {user && <LoggedInView user={user} logout={logout} />}
        {!user && <LoggedOutView />}
      </div>
    </nav>
  );
}
