import api from '../../api/axios.ts';

export default function MyPage() {
  const handleClick = async () => {
    try {
      const response = await api.post('/api/posts', {
        content: 'test',
        authorId: 1,
      });
      console.log('글등록 해보기 : ', response);
    } catch (error) {
      console.error('글등록 실패', error);
    }
  };

  return (
    <div className="wrapper">
      <button onClick={handleClick} className="cursor-pointer border p-2">
        API 요청 테스트
      </button>
    </div>
  );
}
