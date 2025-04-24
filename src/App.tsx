import AppRouter from './routes/AppRouter.tsx';
import AuthProvider from './contexts/AuthProvider.tsx';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />;
    </AuthProvider>
  );
}
