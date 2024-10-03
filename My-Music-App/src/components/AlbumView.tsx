// src/components/AlbumView.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbum } from '../redux/musicSlice';
import { RootState } from '../redux/store';
import { PlayIcon, ClockIcon } from '@heroicons/react/solid';

const AlbumView: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentAlbum, loading, error } = useSelector((state: RootState) => state.music);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbum(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center mt-8">Loading album...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (!currentAlbum) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end space-x-6">
        <img src={currentAlbum.images[0]?.url || '/placeholder.svg'} alt={currentAlbum.name} className="w-48 h-48 object-cover shadow-lg" />
        <div>
          <p className="text-sm font-medium text-gray-400">Album</p>
          <h1 className="text-4xl font-bold">{currentAlbum.name}</h1>
          <p className="text-gray-400 mt-2">
            {currentAlbum.artists.map(artist => artist.name).join(', ')} • {currentAlbum.release_date.split('-')[0]} • {currentAlbum.total_tracks} songs
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <button className="bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition-colors">
            <PlayIcon className="w-8 h-8" />
          </button>
          <h2 className="text-2xl font-bold">Tracks</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-2">#</th>
              <th className="pb-2">Title</th>
              <th className="pb-2 text-right"><ClockIcon className="w-5 h-5 inline" /></th>
            </tr>
          </thead>
          <tbody>
            {currentAlbum.tracks.items.map((track, index) => (
              <tr key={track.id} className="group hover:bg-gray-700">
                <td className="py-4 w-12">{index + 1}</td>
                <td className="py-4">
                  <p className="font-medium">{track.name}</p>
                  <p className="text-sm text-gray-400">{track.artists.map(artist => artist.name).join(', ')}</p>
                </td>
                <td className="py-4 text-right text-gray-400">
                  {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumView;