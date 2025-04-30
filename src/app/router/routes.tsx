import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { RootLayout } from '@app/router/layout';
import { TracksPage } from '@pages/tracks';
import { ErrorPage } from '@pages/error';
import { NotFoundPage } from '@pages/not-found';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { path: '/', element: <Navigate to="/tracks" replace /> },
      { path: '/tracks', element: <TracksPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
