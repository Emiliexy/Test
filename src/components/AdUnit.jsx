import React, { useEffect } from 'react';

const AdUnit = () => {
  useEffect(() => {
    try {
      // 确保 adsbygoogle 已经加载
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense 错误:', err);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-2909094795372025"
           data-ad-slot="5586213646"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </div>
  );
};

export default AdUnit; 