import { TracksPage } from '@pages/tracks';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  { path: '/', element: <TracksPage /> },
  { path: '/tracks', element: <TracksPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
