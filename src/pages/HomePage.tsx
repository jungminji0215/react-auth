import PageContainer from '../components/PageContainer.tsx';
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <PageContainer>
      <section>
        <Link to="/auth">
          <div className="bg-yellow-500 p-5 rounded-lg w-1/2">
            🔐 로그인 기능 보기
          </div>
        </Link>
      </section>
    </PageContainer>
  );
}
