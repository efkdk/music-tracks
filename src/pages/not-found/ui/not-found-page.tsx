import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 rounded-2xl shadow-lg bg-white max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Wrong way.</p>
        <Link
          to="/tracks"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          To Tracks
        </Link>
      </div>
    </div>
  );
};
