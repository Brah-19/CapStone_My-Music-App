// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import Player from './components/Player';
import SpotifyCallback from './components/SpotifyCallback';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex h-screen bg-black text-white">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 overflow-y-auto p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
                <Route path="/callback" element={<SpotifyCallback />} />
              </Routes>
            </main>
            <Player />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;