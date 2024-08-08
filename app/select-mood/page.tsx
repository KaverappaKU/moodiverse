"use client"
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from'react';

const SelectMood: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [currentCategory, setCurrentCategory] = useState<string | string[] | undefined>(undefined);

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    }
  }, [category]);

  const handleMoodClick = (mood: string) => {
    router.push(`/recommendations?category=${category}&mood=${mood}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Select a Mood</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {['happy', 'sad', 'fun', 'romantic', 'scary', 'surprise'].map((mood) => (
            <div key={mood} onClick={() => handleMoodClick(mood)} className="cursor-pointer flex flex-col items-center">
              <img src={`/${mood}-icon.png`} alt={mood} className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">{mood.charAt(0).toUpperCase() + mood.slice(1)}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelectMood;
