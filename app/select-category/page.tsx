import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const SelectCategory: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-20">Select a Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <Link href="/select-mood?category=movies">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/movies-logo.png" alt="Movies" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Movies</p>
            </div>
          </Link>
          <Link href="/select-mood?category=series">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/series-logo.png" alt="Series" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Series</p>
            </div>
          </Link>
          <Link href="/select-mood?category=games">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/games-logo.png" alt="Games" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Games</p>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelectCategory;
