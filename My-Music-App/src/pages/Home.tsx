// src/pages/Home.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedPlaylists, fetchRecentlyPlayed } from '../redux/musicSlice';
import { RootState } from '../redux/store';
import { PlayIcon } from '@heroicons/react/solid';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { featuredPlaylists, recentlyPlayed, loading, error } = useSelector((state: RootState) => state.music);

  useEffect(() => {
    dispatch(fetchFeaturedPlaylists());
    dispatch(fetchRecentlyPlayed());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredPlaylists.map((playlist) => (
            <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <img src={playlist.images[0]?.url || '/placeholder.svg'} alt={playlist.name} className="w-full aspect-square object-cover mb-2 rounded" />
              <h3 className="font-semibold truncate">{playlist.name}</h3>
              <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        <div className="space-y-2">
          {recentlyPlayed.map((item) => (
            <Link key={item.track.id} to={`/album/${item.track.album.id}`} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <img src={item.track.album.images[0]?.url || '/placeholder.svg'} alt={item.track.name} className="w-12 h-12 object-cover rounded" />
              <div className="flex-grow">
                <h3 className="font-semibold truncate">{item.track.name}</h3>
                <p className="text-sm text-gray-400 truncate">{item.track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
              <PlayIcon className="w-6 h-6 text-green-500" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;