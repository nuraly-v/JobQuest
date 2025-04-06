
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Briefcase, LayoutDashboard, ListChecks, Menu, PieChart, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
    { name: 'Applications', path: '/applications', icon: <Briefcase className="h-5 w-5 mr-2" /> },
    { name: 'Tasks', path: '/tasks', icon: <ListChecks className="h-5 w-5 mr-2" /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart className="h-5 w-5 mr-2" /> },
  ];
  
  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50" 
          onClick={toggleSidebar}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'} 
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} 
          w-64 bg-card border-r border-border shadow-sm transition-transform duration-300 ease-in-out
        `}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">JobQuest</h1>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium 
                  ${location.pathname === item.path
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-secondary transition-colors'}
                `}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
