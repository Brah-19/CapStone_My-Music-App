import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Library: React.FC = () => {
  const { savedTracks } = useSelector((state: RootState) => state.music);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedTracks.map((track) => (
          <div key={track.id} className="bg-gray-800 p-4 rounded-lg">
            <img src={track.album.images[0].url} alt={track.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="font-semibold truncate">{track.name}</h3>
            <p className="text-sm text-gray-400 truncate">{track.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;