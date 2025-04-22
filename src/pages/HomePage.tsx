import PageContainer from '../components/PageContainer.tsx';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/post.ts';
import { Link } from 'react-router';

export default function HomePage() {
  const {
    isPending,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <PageContainer>
      <div className="flex justify-end">
        <button className="bg-primary p-4 rounded-xl">
          <Link to="/posts/new">글등록</Link>
        </button>
      </div>

      <section className="flex flex-col items-center justify-center gap-4 mt-4">
        {posts.map((post) => {
          return (
            <div className="bg-gray-200 p-4 rounded-xl w-full" key={post.id}>
              {post.content}
            </div>
          );
        })}
      </section>
    </PageContainer>
  );
}
