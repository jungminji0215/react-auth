import { ReactNode } from 'react';

export default function PageContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-5xl min-h-screen p-4">{children}</div>;
}
