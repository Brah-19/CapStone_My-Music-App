// src/pages/Search.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchTracks } from '../redux/musicSlice';
import { RootState } from '../redux/store';
import { SearchIcon, PlayIcon } from '@heroicons/react/solid';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.music);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchTracks(query));
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tracks, albums, or artists"
          className="flex-grow bg-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-colors">
          <SearchIcon className="w-5 h-5" />
        </button>
      </form>

      {loading && <div className="text-center mt-8">Searching...</div>}

      {error && <div className="text-center mt-8 text-red-500">Error: {error}</div>}

      {searchResults && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <div className="space-y-2">
            {searchResults.tracks?.items.map((track) => (
              <Link key={track.id} to={`/album/${track.album.id}`} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <img src={track.album.images[0]?.url || '/placeholder.svg'} alt={track.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-grow">
                  <h3 className="font-semibold truncate">{track.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <PlayIcon className="w-6 h-6 text-green-500" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;