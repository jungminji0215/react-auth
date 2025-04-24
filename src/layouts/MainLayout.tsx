import { Outlet } from 'react-router';
import Header from '../components/Header.tsx';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
