import PageContainer from '../../components/PageContainer.js';
import { Link } from 'react-router';

export default function AuthPlaygroundPage() {
  return (
    <PageContainer>
      <div className="flex justify-center items-center text-xl">
        로그인한 사람, 로그인 안 한 사람 모두 접근 가능한 페이지
      </div>

      <div className="flex justify-center items-center mt-4">
        <Link to="/auth/mypage">
          <p className="bg-yellow-500 p-4 rounded-lg">페이지 이동</p>
        </Link>
      </div>
    </PageContainer>
  );
}
