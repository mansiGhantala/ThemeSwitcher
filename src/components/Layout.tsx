import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="pt-20 px-4 pb-8 max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}
