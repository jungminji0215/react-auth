import { Post } from '../types/todo.ts';

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts`);

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '알 수 없는 오류가 발생했습니다.');
  }

  const res = await response.json();
  return res.posts;
};

export const createPost = async ({
  content,
  userId,
}: {
  content: string;
  userId: number;
}): Promise<Post> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, authorId: userId }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '알 수 없는 오류가 발생했습니다.');
  }

  const data = await response.json();
  return data.post;
};
