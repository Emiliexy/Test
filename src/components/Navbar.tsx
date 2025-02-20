'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false); // 关闭移动端菜单
    
    if (pathname !== '/') {
      router.push('/');
      // 等待页面加载完成后再滚动
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="content-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="梵海清音Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary-gold" style={{ fontFamily: 'SimSun, serif' }}>
                    Brahmasound
                  </span>
                  <span className="text-lg font-bold text-primary-gold" style={{ fontFamily: 'SimSun, serif' }}>
                    梵海清音
                  </span>
                </div>
                <span className="text-sm text-gray-600">在线礼佛平台</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => scrollToSection('home')} className="nav-link">
              首页
            </button>
            <button onClick={() => scrollToSection('worship')} className="nav-link">
              礼拜观音
            </button>
            <button onClick={() => scrollToSection('sutra')} className="nav-link">
              诵经念佛
            </button>
            <button onClick={() => scrollToSection('dharma')} className="nav-link">
              佛法修行
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-dark-brown hover:text-primary-gold"
              >
                首页
              </button>
              <button
                onClick={() => scrollToSection('worship')}
                className="block w-full text-left px-3 py-2 text-dark-brown hover:text-primary-gold"
              >
                礼拜观音
              </button>
              <button
                onClick={() => scrollToSection('sutra')}
                className="block w-full text-left px-3 py-2 text-dark-brown hover:text-primary-gold"
              >
                诵经念佛
              </button>
              <button
                onClick={() => scrollToSection('dharma')}
                className="block w-full text-left px-3 py-2 text-dark-brown hover:text-primary-gold"
              >
                佛法修行
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 