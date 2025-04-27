import { useAuth } from '../contexts/AuthProvider.tsx';
import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
  const { token, isLoading } = useAuth();
  console.log('ProtectedRoute : ', token);

  if (isLoading) {
    return <div>로딩중</div>; // or Spinner 컴포넌트
  }
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

// 해당 페이지에서 새로고침을 하면 새로고침 직후에는 token 이 null 이여서
// token 이 없다고 판단해서 / 로 리다이렉트 시켜버린다.
// 그래서 loading 상태를 확인해야함
