"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Games = () => {
  const [games, setGames] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleClick = (game: any) => {
    setSelectedGame(game);
  };

  const handleClose = () => {
    setSelectedGame(null);
  };

  return (
    <>
      <Header />
      <main className="m-5 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Popular Games</h1>
        <div className="flex flex-wrap">
          {games.map((game) => (
            <div
              key={game.id}
              className="m-2 w-48 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handleClick(game)}
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl mt-2">{game.name}</h2>
                <p className="text-gray-700">Rating: {game.rating}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedGame && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
              <button className="mb-4 text-red-500" onClick={handleClose}>
                Close
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedGame.name}</h2>
              <img
                src={selectedGame.background_image}
                alt={selectedGame.name}
                className="w-full rounded-lg mb-4"
              />
              <p className="text-gray-700">{selectedGame.developers}</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Games;
