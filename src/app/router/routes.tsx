import { TracksPage } from '@pages/tracks';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { RootLayout } from './layout';
import { ErrorPage } from '@pages/error';
import { NotFoundPage } from '@pages/not-found';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { path: '/', element: <TracksPage /> },
      { path: '/tracks', element: <TracksPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
