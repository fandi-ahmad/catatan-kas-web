import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feedback from './components/Feedback';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="bg-slate-200 dark:bg-slate-900 font-body text-gray-800 dark:text-white">
      <div className='bg-white max-w-xl mx-auto dark:bg-slate-800 min-h-screen relative'>
        <Header/>
        <Sidebar/>
        <div>
          {children}
        </div>
        <Feedback/>
      </div>
    </div>
  )
}

export default Layout