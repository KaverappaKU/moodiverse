import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-10 bg-[#050325] text-white">
      <div className="text-xl font-bold">
        <Link className="font-bold" href="/">MOODIVERSE</Link>
      </div>
      <nav>
        <ul className="flex space-x-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li>
            <Link href="/series">Series</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
          <li>
            <Link href="/login">
              <button className="bg-white text-[#050325] px-4 py-2 rounded">Login</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
