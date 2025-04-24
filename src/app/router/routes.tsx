import { TracksPage } from '@pages/tracks';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { RootLayout } from './layout';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <TracksPage /> },
      { path: '/tracks', element: <TracksPage /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
