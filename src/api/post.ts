import { Post } from '../types/todo.ts';

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts`);

  const res = await response.json();
  return res.posts;
};
