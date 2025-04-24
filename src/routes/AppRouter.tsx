import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import MainLayout from '../layouts/MainLayout.tsx';
import HomePage from '../pages/HomePage.tsx';
import AuthLayout from '../layouts/AuthLayout.tsx';
import SignUpPage from '../pages/auth/SignUpPage.tsx';
import SignInPage from '../pages/auth/SignInPage.tsx';
import MyPage from '../pages/auth/MyPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'mypage',
        Component: MyPage,
      },
    ],
  },

  {
    path: '/',
    Component: AuthLayout,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'signup',
        Component: SignUpPage,
      },
      {
        path: 'signin',
        Component: SignInPage,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
