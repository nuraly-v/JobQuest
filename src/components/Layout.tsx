
import React from 'react';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className={`flex-1 p-6 ${isMobile ? 'pl-16' : 'pl-64'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
