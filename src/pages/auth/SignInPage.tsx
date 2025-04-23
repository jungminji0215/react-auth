export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form className="flex flex-col gap-2 w-full max-w-sm">
        <input
          type="email"
          placeholder="이메일"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-yellow-500 rounded-md p-2">
          로그인
        </button>
      </form>
    </div>
  );
}
