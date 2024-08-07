/* "use client"
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations: React.FC = () => {
  const router = useRouter(); // No need to cast to NextRouter
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { category, mood } = router.query; // TypeScript knows that router.query has properties 'category' and 'mood'

    if (category && mood) {
      const fetchRecommendations = async () => {
        try {
          const endpoints = {
            movies: `https://api.themoviedb.org/3/discover/movie`,
            games: `https://api.rawg.io/api/games`,
          };
          const apiKey = 'YOUR_API_KEY';

          const response = await axios.get(endpoints[category as string], {
            params: {
              api_key: apiKey,
              with_genres: mood,
            },
          });

          setRecommendations(response.data.results);
        } catch (err) {
          setError('Failed to fetch recommendations');
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
    }
  }, [router.query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Recommendations</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {recommendations.map((item: any) => (
            <div key={item.id} className="flex flex-col items-center">
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">{item.title || item.name}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations; */