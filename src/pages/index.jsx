import React from 'react';
import Navbar from '../components/Navbar';
import WishScroller from '../components/WishScroller';
import AdUnit from '../components/AdUnit';
import SutraReader from '../components/Sutra';
import BlogSection from '../components/BlogSection';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 text-white">
      <Navbar />
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 左侧：菩萨图片和经文诵读 */}
            <div className="md:col-span-2">
              {/* 菩萨图片区域 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="buddha-image">
                  <img src="images/guanyin.jpg" alt="观世音菩萨" id="buddhaImage" />
                  <div className="light-effect"></div>
                </div>
                {/* 祈愿输入区域 */}
                <div className="wish-section">
                  <textarea id="wishInput" placeholder="请在此写下您的心愿..."></textarea>
                  <button id="submitWish" className="golden-button">祈愿行拜礼</button>
                </div>
              </div>
              
              {/* 经文诵读模块 */}
              <div className="mt-6">
                <SutraReader />
              </div>

              {/* 佛学文章模块 */}
              <div className="mt-6">
                <BlogSection />
              </div>
              
              {/* 广告区域 */}
              <div className="mt-4">
                <AdUnit />
              </div>
            </div>
            
            {/* 右侧：祈愿墙 */}
            <div className="h-full">
              <WishScroller />
              <div className="mt-4">
                <AdUnit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 