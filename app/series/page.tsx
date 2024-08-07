"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Series = () => {
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('/api/series');
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <>
      <Header />
      <main className="m-5 bg-[#050325]">
        <h1 className="text-3xl font-bold mb-4">Popular Series</h1>
        <div className="flex flex-wrap">
          {series.map((serie) => (
            <div
              key={serie.id}
              className="m-2 w-48 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.title}
                className="w-full rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl mt-2">{serie.title}</h2>
                <p className="text-gray-700">Rating: {serie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Series;
