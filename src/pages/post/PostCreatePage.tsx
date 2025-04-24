import PageContainer from '../../components/PageContainer.tsx';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/post.ts';
import { useNavigate } from 'react-router';
import * as React from 'react';

export default function PostCreatePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: (error) => {
      console.error('게시물 등록 실패:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ content, userId: 0 });
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={content}
          className="p-2 border rounded-md"
          onChange={(e) => setContent(e.target.value)}
        />

        {isError && (
          <p className="text-red-500" onClick={() => reset()}>
            {error.message || '등록 중 오류가 발생했습니다.'}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`border bg-primary rounded-md cursor-pointer ${isPending && 'opacity-50 cursor-not-allowed'}`}
        >
          {isPending ? '등록 중...' : '글 등록'}
        </button>
      </form>
    </PageContainer>
  );
}
