import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { RootState } from '../redux/store';

const Sidebar: React.FC = () => {
  const { userPlaylists } = useSelector((state: RootState) => state.music);

  return (
    <div className="w-64 bg-gray-900 p-6 flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Music App</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
              <HomeIcon className="h-6 w-6" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="flex items-center space-x-2 hover:text-gray-300">
              <SearchIcon className="h-6 w-6" />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/library" className="flex items-center space-x-2 hover:text-gray-300">
              <LibraryIcon className="h-6 w-6" />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Playlists</h2>
          <button className="flex items-center space-x-2 hover:text-gray-300 mb-4">
            <PlusCircleIcon className="h-6 w-6" />
            <span>Create Playlist</span>
          </button>
          <ul className="space-y-2">
            {userPlaylists.map((playlist) => (
              <li key={playlist.id}>
                <Link to={`/playlist/${playlist.id}`} className="hover:text-gray-300">
                  {playlist.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;