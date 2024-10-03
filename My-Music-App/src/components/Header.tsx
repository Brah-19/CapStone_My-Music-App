// src/components/Header.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { SearchIcon, UserCircleIcon } from '@heroicons/react/solid';
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.music.accessToken);

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/callback';
    const scopes = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
        <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search for Artists, Songs, or Podcasts"
          className="bg-transparent focus:outline-none text-white"
        />
      </div>
      <div className="flex items-center space-x-4">
        {accessToken ? (
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            Login with Spotify
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;