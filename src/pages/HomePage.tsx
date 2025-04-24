import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl min-h-screen p-4">
      <div className="flex justify-center items-center text-xl">
        로그인한 사람, 로그인 안 한 사람 모두 접근 가능한 페이지
      </div>

      <div className="flex justify-center items-center mt-4">
        <Link to="/mypage">
          <p className="bg-yellow-500 p-4 rounded-lg">페이지 이동</p>
        </Link>
      </div>
    </div>
  );
}
