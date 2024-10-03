// src/services/spotifyApi.ts

import axios from 'axios';

const BASE_URL = 'https://accounts.spotify.com/api/token';
let accessToken: string | null = null;

const spotifyApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

spotifyApi.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const search = (query: string, type: string = 'track,album,artist') => {
  return spotifyApi.get('/search', { params: { q: query, type } });
};

export const getFeaturedPlaylists = () => {
  return spotifyApi.get('/browse/featured-playlists');
};

export const getRecentlyPlayed = () => {
  return spotifyApi.get('/me/player/recently-played');
};

export const getAlbum = (albumId: string) => {
  return spotifyApi.get(`/albums/${albumId}`);
};

export const getArtist = (artistId: string) => {
  return spotifyApi.get(`/artists/${artistId}`);
};

export const getArtistTopTracks = (artistId: string, country: string = 'US') => {
  return spotifyApi.get(`/artists/${artistId}/top-tracks`, { params: { country } });
};

export const getUser = () => {
  return spotifyApi.get('/me');
};

export default spotifyApi;