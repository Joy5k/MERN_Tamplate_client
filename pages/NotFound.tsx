import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
