import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="wrapper bg-gray-100">
      <div className="flex justify-between">
        <h2>심플앱</h2>
        <ul className="flex gap-4">
          <li>
            <Link to="/signin">로그인</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <button>로그아웃</button>
        </ul>
      </div>
    </header>
  );
}
