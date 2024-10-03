import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as spotifyApi from '../services/spotifyApi';

export const fetchAccessToken = createAsyncThunk(
  'music/fetchAccessToken',
  async (code: string) => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/callback',
      }),
    });
    const data = await response.json();
    spotifyApi.setAccessToken(data.access_token);
    return data;
  }
);

export const searchTracks = createAsyncThunk(
  'music/searchTracks',
  async (query: string) => {
    const response = await spotifyApi.search(query);
    return response.data;
  }
);

export const fetchFeaturedPlaylists = createAsyncThunk(
  'music/fetchFeaturedPlaylists',
  async () => {
    const response = await spotifyApi.getFeaturedPlaylists();
    return response.data.playlists.items;
  }
);

export const fetchRecentlyPlayed = createAsyncThunk(
  'music/fetchRecentlyPlayed',
  async () => {
    const response = await spotifyApi.getRecentlyPlayed();
    return response.data.items;
  }
);

export const fetchAlbum = createAsyncThunk(
  'music/fetchAlbum',
  async (albumId: string) => {
    const response = await spotifyApi.getAlbum(albumId);
    return response.data;
  }
);

export const fetchArtist = createAsyncThunk(
  'music/fetchArtist',
  async (artistId: string) => {
    const response = await spotifyApi.getArtist(artistId);
    const topTracks = await spotifyApi.getArtistTopTracks(artistId);
    return { ...response.data, topTracks: topTracks.data.tracks };
  }
);
interface MusicState {
  featuredPlaylists: any[];
  searchResults: {
    tracks: any[];
    albums: any[];
    artists: any[];
    accessToken: null,
  };
  savedTracks: any[];
  recentlyPlayed: any[];
  currentTrack: any | null;
  currentAlbum: any | null;
  currentArtist: any | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  loading: boolean;
  userPlaylists: any[];
  queue: any[];
  
  
}

const initialState: MusicState = {
  featuredPlaylists: [],
  searchResults: {
    tracks: [],
    albums: [],
    artists: [],
    accessToken: null
  },
  savedTracks: [],
  recentlyPlayed: [],
  currentTrack: null,
  currentAlbum: null,
  currentArtist: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  loading: false,
  userPlaylists: [],
  queue: []
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<any>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      if (!state.queue.some(track => track.id === action.payload.id)) {
        state.queue.push(action.payload);
      }
    },
    nextTrack: (state) => {
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
      if (currentIndex < state.queue.length - 1) {
        state.currentTrack = state.queue[currentIndex + 1];
      }
    },
    previousTrack: (state) => {
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
      if (currentIndex > 0) {
        state.currentTrack = state.queue[currentIndex - 1];
      }
    },
    addToQueue: (state, action: PayloadAction<any>) => {
      state.queue.push(action.payload);
    },
    clearQueue: (state) => {
      state.queue = [];
    },
  },
        setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(fetchAccessToken.fulfilled, (state, action) => {
          state.accessToken = action.payload.access_token;
        })
        .addCase(searchTracks.fulfilled, (state, action) => {
          state.searchResults = action.payload;
          state.loading = false;
        })
        .addCase(fetchFeaturedPlaylists.fulfilled, (state, action) => {
          state.featuredPlaylists = action.payload;
          state.loading = false;
        })
        .addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
          state.recentlyPlayed = action.payload;
        })
        .addCase(fetchAlbum.fulfilled, (state, action) => {
          state.currentAlbum = action.payload;
        })
        .addCase(fetchArtist.fulfilled, (state, action) => {
          state.currentArtist = action.payload;
        });
    },
  });
export const { playTrack, pauseTrack, nextTrack, previousTrack, setVolume, setProgress } = musicSlice.actions;

export default musicSlice.reducer;