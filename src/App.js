import './styles/App.css';
import { Header, Account, Login, Register, UserProfile } from './components/layout';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Verify from './components/layout/Verify';
import { useEffect } from 'react';
import { getSession } from './UserPool';
import { useDispatch } from 'react-redux';
import { appLogin } from './features/user';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getSession().then((session) => {
      dispatch(
        appLogin({
          email: session.idToken.payload.email,
          username: session.accessToken.payload.username,
          idToken: session.idToken.jwtToken,
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
        })
      );
    });
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
