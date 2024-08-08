"use client"
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NextResponse } from 'next/server';

const Recommendations: React.FC = () => {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const  category = searchParams.get('category');
  const  mood = searchParams.get('mood');
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentMood, setCurrentMood] = useState(mood);

  const moodToGenreMap: { [key: string]: number[] } = {
    happy: [12, 16],
    sad: [35],    
    fun: [28],  
    romantic: [10749],
    scary: [80],   
    surprise: [107],
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
      fetchRecommendations(currentCategory, currentMood)
    }
    [currentCategory, currentMood]
  })

  const fetchRecommendations = async (category: string, mood: string) => {
    
    const genreIds = moodToGenreMap[mood];
      
    const genreIdsString = genreIds.join(',');
    let categoryUrl = "";
    let categoryUrlApiKey = "";
      switch(category){
        case 'movies':
          categoryUrl = `${process.env.NEXT_PUBLIC_DISCOVER_TMDB_MOVIE_URL}`
          categoryUrlApiKey = `${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          break;
        case 'series':
          categoryUrl = `${process.env.NEXT_PUBLIC_DISCOVER_TMDB_TV_URL}`
          categoryUrlApiKey = `${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          break;
        case 'games':
          categoryUrl = "https://api.rawg.io/api/games"
          categoryUrlApiKey = `${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
          break;
        default:
          categoryUrl = ""
          categoryUrlApiKey = ""
      }
      console.log(categoryUrl, categoryUrlApiKey) 
      if (!categoryUrl && !categoryUrlApiKey) {
        console.error('Unknown category:', category);
        console.error('Unknown API key:', categoryUrlApiKey)
        return;
      }
      else{
        console.log(categoryUrl)
        console.log(categoryUrlApiKey)
      }

      try {
        const response = await axios.get(`${categoryUrl}`,{
          params: {
            api_key: categoryUrlApiKey,
            with_genres: `${genreIdsString}`
          }
        })
        console.log(response.data.results)
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Recommendations</h1>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {recommendations.map((item: any) => (
            <div key={item.id} className="flex flex-col items-center">
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">{item.title || item.name}</p>
            </div>
          ))}
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;