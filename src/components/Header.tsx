import { Link, useNavigate } from 'react-router';
import { authService } from '../services/authService.ts';
import { useAuth } from '../contexts/AuthProvider.tsx';

export default function Header() {
  const { setToken, token } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setToken(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('로그아웃 실패했습니다.');
    }
  };

  return (
    <header className="border-b border-gray-300">
      <div className="wrapper flex justify-between">
        <h2>
          <Link to="/">🏠</Link>
        </h2>
        <ul className="flex gap-4">
          {token ? (
            <li>
              <button onClick={handleLogout} className="cursor-pointer">
                로그아웃
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
