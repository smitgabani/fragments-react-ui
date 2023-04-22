import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import { useSelector } from 'react-redux';

export default function Home() {
  const apiUrl = process.env.API_URL || 'http://localhost:8080';
  const user = useSelector((state) => state.user.value);

  return (
    <div className="home-page">
      <Banner />
    </div>
  );
}
