import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import MainLayout from '../layouts/MainLayout.tsx';
import HomePage from '../pages/HomePage.tsx';
import AuthLayout from '../layouts/AuthLayout.tsx';
import SignUpPage from '../pages/auth/SignUpPage.tsx';
import SignInPage from '../pages/auth/SignInPage.tsx';
import MyPage from '../pages/auth/MyPage.tsx';
import ProtectedRoute from '../components/ProtectedRoute.tsx';
import PublicRoute from '../components/PublicRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <NotFoundPage />,
    children: [
      // 누구나 접근 가능
      { index: true, Component: HomePage },

      // mypage 는 로그인한 사용자만
      {
        path: 'mypage',
        Component: ProtectedRoute,
        children: [{ index: true, Component: MyPage }],
      },
    ],
  },

  {
    path: '/',
    Component: AuthLayout,
    errorElement: <NotFoundPage />,
    children: [
      // /signup, /signin 은 로그인 안 한 사용자만
      {
        path: 'signup',
        Component: PublicRoute,
        children: [{ index: true, Component: SignUpPage }],
      },
      {
        path: 'signin',
        Component: PublicRoute,
        children: [{ index: true, Component: SignInPage }],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
