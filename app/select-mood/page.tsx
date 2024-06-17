import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const SelectMood: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Select a Mood</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <Link href="/recommendations?mood=happy">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/happy-icon.png" alt="Happy" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Happy</p>
            </div>
          </Link>
          <Link href="/recommendations?mood=sad">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/sad-icon.png" alt="Sad" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Sad</p>
            </div>
          </Link>
          <Link href="/recommendations?mood=fun">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/fun-icon.png" alt="Fun" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Fun</p>
            </div>
          </Link>
          <Link href="/recommendations?mood=romantic">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/romantic-icon.png" alt="Romantic" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Romantic</p>
            </div>
          </Link>
          <Link href="/recommendations?mood=scary">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/scary-icon.png" alt="Scary" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Scary</p>
            </div>
          </Link>
          <Link href="/recommendations?mood=surprise-me">
            <div className="cursor-pointer flex flex-col items-center">
              <img src="/surprise-icon.png" alt="Surprise Me" className="w-48 h-48 object-cover rounded-lg hover:opacity-80" />
              <p className="mt-2 text-lg font-bold">Surprise Me</p>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelectMood;
