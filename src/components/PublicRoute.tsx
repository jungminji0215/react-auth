/**
 * 로그인하지 않은 사용자만 접근 허용
 * 로그인된 사용자는 홈으로 리다이렉트
 */
import { useAuth } from '../contexts/AuthProvider.tsx';
import { Navigate, Outlet } from 'react-router';

export default function PublicRoute() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
