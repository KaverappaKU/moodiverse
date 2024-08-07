"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Header />
      <main className="m-5 bg-[#050325]">
        <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
        <div className="flex flex-wrap">
          {movies.map((movie) => (
            <div key={movie.id} className="m-2 w-48 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg"
              />
              <h2 className="text-xl mt-2">{movie.title}</h2>
              <p className="text-gray-700">Rating: {movie.vote_average}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
