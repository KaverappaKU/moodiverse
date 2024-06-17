import Header from '../components/Header';

const Movies: React.FC = () => {
  return (
    <>
      <Header />
      <main className="p-5">
        <h1 className="text-2xl font-bold">Movies</h1>
        <p>This is the movies page.</p>
      </main>
    </>
  );
};

export default Movies;
