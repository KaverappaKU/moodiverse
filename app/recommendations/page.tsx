"use client";
import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Recommendations: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const mood = searchParams.get("mood") || "";
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentMood, setCurrentMood] = useState(mood);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const moodToGenreMapMovie: { [key: string]: number[] } = {
    happy: [28, 12, 14, 16, 80, 99],
    sad: [16, 35, 14, 10402],
    fun: [53, 80, 9648, 10752],
    romantic: [10749, 10402, 10751],
    scary: [27, 35],
    surprise: [
      28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
      10770, 53, 10752, 37,
    ],
  };

  const moodToGenreMapTv: { [key: string]: number[] } = {
    happy: [10759, 80, 18, 9648, 10765, 10766],
    sad: [35, 16, 10762],
    fun: [16, 10762, 9648, 10765, 10766, 10767],
    romantic: [16, 10759, 35, 10751, 10762, 9648, 10766],
    scary: [16, 35],
    surprise: [
      10759, 16, 35, 80, 99, 18, 10751, 10762, 9648, 10763, 10764, 10765, 10766,
      10767, 10768, 37, 10766, 10767, 10768, 37,
    ],
  };

  const moodToGenreMapGame: { [key: string]: string[] } = {
    happy: [
      "action",
      "adventure",
      "role-playing-games-rpg",
      "strategy",
      "sports",
      "card",
    ],
    sad: [
      "shooter",
      "simulation",
      "arcade",
      "racing",
      "fighting",
      "board Games",
      "educational",
    ],
    fun: [
      "puzzle",
      "casual",
      "indie",
      "platformer",
      "massively-multiplayer",
      "sports",
      "family",
      "card",
    ],
    romantic: ["board-games"],
    scary: ["fighting", "board-games", "educational"],
    surprise: [
      "action",
      "adventure",
      "role-playing-games-rpg",
      "strategy",
      "sports",
      "card",
      "shooter",
      "simulation",
      "arcade",
      "racing",
      "puzzle",
      "casual",
      "indie",
      "platformer",
      "massively-multiplayer",
      "family",
      "fighting",
      "board-games",
      "educational",
    ],
  };

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    }
    if (mood) {
      setCurrentMood(mood);
    }
  }, [category, mood]);

  useEffect(() => {
    if (currentCategory && currentMood) {
      fetchRecommendations(currentCategory, currentMood);
    }
  }, [currentCategory, currentMood]);

  const fetchRecommendations = async (category: string, mood: string) => {
    setLoading(true);
    const genreIds =
      category === "series"
        ? moodToGenreMapTv[mood]
        : category === "games"
        ? moodToGenreMapGame[mood]
        : moodToGenreMapMovie[mood];
    const randomGenreId = genreIds[Math.floor(Math.random() * genreIds.length)];
    let categoryUrl = "";
    let categoryUrlApiKey = "";

    switch (category) {
      case "movies":
        categoryUrl = `${process.env.NEXT_PUBLIC_DISCOVER_TMDB_MOVIE_URL}`;
        categoryUrlApiKey = `${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
        break;
      case "series":
        categoryUrl = `${process.env.NEXT_PUBLIC_DISCOVER_TMDB_TV_URL}`;
        categoryUrlApiKey = `${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
        break;
      case "games":
        categoryUrl = `${process.env.NEXT_PUBLIC_RAWG_URL}`;
        categoryUrlApiKey = `${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;
        break;
      default:
        categoryUrl = "";
        categoryUrlApiKey = "";
    }

    if (!categoryUrl || !categoryUrlApiKey) {
      console.error("Unknown category:", category);
      setLoading(false);
      return;
    }

    try {
      const params: any = {
        key: categoryUrlApiKey,
      };

      if (category === "games") {
        params.genres = randomGenreId;
      } else {
        params.api_key = categoryUrlApiKey;
        params.with_genres = randomGenreId;
      }

      const response = await axios.get(`${categoryUrl}`, { params });
      const results = response.data.results;

      if (results && results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        setRecommendation(results[randomIndex]);
      } else {
        setRecommendation(null);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <div>
        <Header />
        <main className="flex flex-col items-center justify-center min-h-screen p-2 bg-[#050325]">
          <h1 className="text-4xl text-white font-bold mb-4">
            Recommended for you
          </h1>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : recommendation ? (
            <div
              className={`p-4 bg-white rounded-lg shadow-md ${
                category === "games"
                  ? "max-w-md"
                  : category === "movies"
                  ? "max-w-custom"
                  : "max-w-custom"
              }`}
            >
              <img
                src={
                  category === "games"
                    ? recommendation.background_image
                      ? recommendation.background_image
                      : "/default-image.jpg"
                    : recommendation.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${recommendation.poster_path}`
                    : "/default-image.jpg"
                }
                alt={
                  recommendation.title || recommendation.name || "Default Title"
                }
                className="w-full h-auto rounded-lg"
              />
              <h2 className="mt-4 text-2xl text-black font-semibold text-center">
                {recommendation.title || recommendation.name}
              </h2>
              <p className="mt-2 text-gray-700">
                {category === "games" ? (
                  <p>
                    <div>Ratings: {recommendation.rating}</div>
                    <div>Metacritic: {recommendation.metacritic}%</div>
                  </p>
                ) : recommendation.overview &&
                  recommendation.overview.length > 100 ? (
                  recommendation.overview.substring(0, 500) + "..."
                ) : (
                  recommendation.overview
                )}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No recommendations available.</p>
          )}
          <button
            onClick={() => {
              if (currentCategory && currentMood) {
                fetchRecommendations(currentCategory, currentMood);
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Refresh Recommendation
          </button>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default Recommendations;
