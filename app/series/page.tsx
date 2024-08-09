"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Series = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<any | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get("/api/series");
        setSeries(response.data);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchSeries();
  }, []);

  const handleClick = (game: any) => {
    setSelectedSeries(game);
  };

  const handleClose = () => {
    setSelectedSeries(null);
  };

  return (
    <>
      <Header />
      <main className="p-5 bg-[#050325]">
        <h1 className="text-3xl font-bold mb-4">Popular Series</h1>
        <div className="flex flex-wrap">
          {series.map((serie) => (
            <div
              key={serie.id}
              className="m-2 w-48 rounded-lg overflow-hidden shadow-lg"
              onClick={() => handleClick(serie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.title}
                className="w-full rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl mt-2">{serie.original_name}</h2>
                <p className="text-yellow-700">Rating: {serie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedSeries && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
              <button className="mb-4 text-red-500" onClick={handleClose}>
                Close
              </button>
              (
              <p className="mt-4 text-gray-700 font-bold">
                {selectedSeries.original_name}
              </p>
              <p className="mt-4 text-gray-700">{selectedSeries.overview}</p>)
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Series;
