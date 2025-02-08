import React from 'react';
import WishScroller from '../components/WishScroller';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 左侧：菩萨图片 */}
          <div className="md:col-span-2">
            {/* 这里放置菩萨图片和留言组件 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-full">
              {/* 原有的图片和留言内容 */}
            </div>
          </div>
          
          {/* 右侧：祈愿墙 */}
          <div className="h-full">
            <WishScroller />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 