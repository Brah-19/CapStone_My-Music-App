import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { playTrack, pauseTrack, nextTrack, previousTrack, setVolume, setProgress } from '../redux/musicSlice';
import { RootState } from '../redux/store';

const Player: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, volume, progress } = useSelector((state: RootState) => state.music);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      dispatch(setProgress(progress));
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={currentTrack.album.images[0].url} alt={currentTrack.name} className="w-16 h-16 rounded-md" />
        <div>
          <h3 className="font-semibold">{currentTrack.name}</h3>
          <p className="text-sm text-gray-400">{currentTrack.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2 flex-1 mx-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => dispatch(previousTrack())} className="text-gray-400 hover:text-white">
            <RewindIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => isPlaying ? dispatch(pauseTrack()) : dispatch(playTrack(currentTrack))}
            className="bg-white text-black rounded-full p-2 hover:bg-gray-200"
          >
            {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
          </button>
          <button onClick={() => dispatch(nextTrack())} className="text-gray-400 hover:text-white">
            <FastForwardIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="w-full flex items-center space-x-2">
          <div className="text-xs">{formatTime(audioRef.current?.currentTime || 0)}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              if (audioRef.current) {
                const newTime = (parseInt(e.target.value) / 100) * audioRef.current.duration;
                audioRef.current.currentTime = newTime;
              }
            }}
            className="w-full"
          />
          <div className="text-xs">{formatTime(audioRef.current?.duration || 0)}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <VolumeUpIcon className="h-5 w-5 text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
          className="w-24"
        />
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.preview_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => dispatch(nextTrack())}
      />
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default Player;