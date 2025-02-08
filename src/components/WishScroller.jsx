import React, { useEffect, useState } from 'react';

const DEFAULT_WISHES = [
  "南無大慈大悲觀世音菩薩",
  "願家人健康幸福",
  "祝福大家平安吉祥🙏🙏🙏",
  "南無大慈大悲觀世音菩薩摩訶薶",
  "恭迎观世音菩萨诞辰。愿观音菩萨佛号之功德，回向给一切众生，愿健康喜悦。🙏",
  "希望大家能夠遠離所有一切災難！希望大家能夠消除所有一切災難！",
  "保佑眾生平安健康。南無大慈大悲觀世音菩薩。🙏",
  "希望大家能夠有善根、福德、因緣、根基、祖德、佛緣。希望大家能夠禮敬諸佛、稱讚如來、廣修供養、懺悔業障、隨喜功德、請轉法輪、請佛住世、常隨佛學、恆順眾生、普皆回向。",
  "希望大家能夠了脫離三界生死六道輪迴。希望大家能夠諸惡莫作。",
  "世界和平",
  "希望世界和平",
  "祝大家新年快乐",
  "愿所有人都健康幸福",
  "期待美好的未来"
];

const WishScroller = () => {
  const [wishes, setWishes] = useState([]);
  
  useEffect(() => {
    // 创建一个循环的愿望列表
    setWishes([...DEFAULT_WISHES, ...DEFAULT_WISHES]);
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setWishes(prev => {
        const newWishes = [...prev];
        // 移除第一个愿望并添加到末尾
        const firstWish = newWishes.shift();
        newWishes.push(firstWish);
        return newWishes;
      });
    }, 2000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-2">許願牆</h3>
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute w-full">
          {wishes.slice(0, 8).map((wish, index) => (
            <div
              key={index}
              className="transform transition-all duration-1000 ease-linear py-2"
              style={{
                opacity: 1 - index * 0.1,
                transform: `translateY(${index * 40}px)`
              }}
            >
              <p className="text-lg whitespace-pre-wrap break-words">
                {wish}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-300 mt-2">
        共 {DEFAULT_WISHES.length} 個願望
      </div>
    </div>
  );
};

export default WishScroller; 