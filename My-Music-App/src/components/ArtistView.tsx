// src/components/ArtistView.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchArtist } from '../redux/musicSlice';
import { RootState } from '../redux/store';
import { PlayIcon, ClockIcon } from '@heroicons/react/solid';

const ArtistView: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentArtist, loading, error } = useSelector((state: RootState) => state.music);

  useEffect(() => {
    if (id) {
      dispatch(fetchArtist(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center mt-8">Loading artist...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (!currentArtist) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end space-x-6">
        <img src={currentArtist.images[0]?.url || '/placeholder.svg'} alt={currentArtist.name} className="w-48 h-48 object-cover rounded-full shadow-lg" />
        <div>
          <p className="text-sm font-medium text-gray-400">Artist</p>
          <h1 className="text-4xl font-bold">{currentArtist.name}</h1>
          <p className="text-gray-400 mt-2">{currentArtist.followers.total.toLocaleString()} followers</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <button className="bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition-colors">
            <PlayIcon className="w-8 h-8" />
          </button>
          <h2 className="text-2xl font-bold">Top Tracks</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-2">#</th>
              <th className="pb-2">Title</th>
              <th className="pb-2">Album</th>
              <th className="pb-2 text-right"><ClockIcon className="w-5 h-5 inline" /></th>
            </tr>
          </thead>
          <tbody>
            {currentArtist.topTracks.map((track, index) => (
              <tr key={track.id} className="group hover:bg-gray-700">
                <td className="py-4 w-12">{index + 1}</td>
                <td className="py-4">
                  <p className="font-medium">{track.name}</p>
                </td>
                <td className="py-4">
                  <Link to={`/album/${track.album.id}`} className="text-sm text-gray-400 hover:underline">
                    {track.album.name}
                  </Link>
                </td>
                <td className="py-4 text-right text-gray-400">
                  {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentArtist.albums?.items.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <img src={album.images[0]?.url || '/placeholder.svg'} alt={album.name} className="w-full aspect-square object-cover mb-2 rounded" />
              <h3 className="font-semibold truncate">{album.name}</h3>
              <p className="text-sm text-gray-400">{album.release_date.split('-')[0]}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistView;