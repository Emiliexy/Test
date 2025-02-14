import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-amber-900/80 to-amber-800/80 backdrop-blur-sm text-amber-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo区域 */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/lotus-icon.svg" alt="莲花图标" className="h-8 w-8 filter invert" />
            <span className="text-xl font-semibold">观世音在线</span>
          </Link>
          
          {/* 导航链接 */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-amber-200 transition-colors">
              在线拜拜
            </Link>
            <Link to="/sutra" className="hover:text-amber-200 transition-colors">
              诵经修行
            </Link>
            <Link to="/blog" className="hover:text-amber-200 transition-colors">
              佛法开示
            </Link>
            <Link to="/calendar" className="hover:text-amber-200 transition-colors">
              佛历节日
            </Link>
          </div>
          
          {/* 移动端菜单按钮 */}
          <button className="md:hidden p-2 rounded-lg hover:bg-amber-700/50 transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-amber-700/50 transition-colors">
            在线拜拜
          </Link>
          <Link to="/sutra" className="block px-3 py-2 rounded-md hover:bg-amber-700/50 transition-colors">
            诵经修行
          </Link>
          <Link to="/blog" className="block px-3 py-2 rounded-md hover:bg-amber-700/50 transition-colors">
            佛法开示
          </Link>
          <Link to="/calendar" className="block px-3 py-2 rounded-md hover:bg-amber-700/50 transition-colors">
            佛历节日
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 