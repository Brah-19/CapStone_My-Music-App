// src/components/SpotifyCallback.tsx

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchAccessToken } from '../redux/musicSlice';

const SpotifyCallback: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      dispatch(fetchAccessToken(code))
        .then(() => navigate('/'))
        .catch((error) => console.error('Authentication failed:', error));
    }
  }, [dispatch, location, navigate]);

  return <div>Authenticating...</div>;
};

export default SpotifyCallback;