import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  return <div>Dashboard</div>;
};

export default Dashboard;
