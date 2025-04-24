import { FormEvent, useState } from 'react';
import { authService } from '../../services/authService.ts';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthProvider.tsx';

export default function SignInPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await authService.signIn(email, password);
      setToken(response.accessToken);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        className="flex flex-col gap-2 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <input
          value={email}
          type="email"
          placeholder="이메일"
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="비밀번호"
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-500 rounded-md p-2 cursor-pointer"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
