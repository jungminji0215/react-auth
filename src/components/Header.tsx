import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="border-b border-gray-300">
      <div className="wrapper flex justify-between">
        <h2>
          <Link to="/">🏠</Link>
        </h2>
        <ul className="flex gap-4">
          <li>
            <Link to="/auth/signin">로그인</Link>
          </li>
          <li>
            <Link to="/auth/signup">회원가입</Link>
          </li>
          <button>로그아웃</button>
        </ul>
      </div>
    </header>
  );
}
