import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5 bg-[#050325] text-white text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Moodiverse</h1>
        <p className="text-lg italic hover:not-italic mb-2">The entertainment recommendation platform.</p>
        <p className="text-lg italic mb-8">Unable to decide what to do? We are here to help you out.</p>
        <Link href="/select-category">
          <button className="bg-yellow-500 font-bold text-[#050325] px-4 py-2 rounded hover:bg-yellow-600">
            CLICK TO START
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
