import React from 'react';

const BLOG_POSTS = [
  {
    id: 1,
    title: '观世音菩萨的慈悲与智慧',
    excerpt: '观世音菩萨代表着无尽的慈悲与智慧，其愿力遍及十方世界...',
    date: '2024-03-20',
    readTime: '5分钟',
    link: '/blog/guanyin-wisdom'
  },
  {
    id: 2,
    title: '佛教中的"空"义浅析',
    excerpt: '佛教所说的"空"，并非虚无，而是指诸法无自性，缘起性空...',
    date: '2024-03-18',
    readTime: '7分钟',
    link: '/blog/emptiness'
  },
  {
    id: 3,
    title: '浅谈念佛修行的方法',
    excerpt: '念佛是净土宗的主要修行方法，包括持名念佛、观想念佛...',
    date: '2024-03-15',
    readTime: '6分钟',
    link: '/blog/buddha-recitation'
  }
];

const BlogSection = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-amber-100">佛学文章</h2>
      <div className="grid gap-6">
        {BLOG_POSTS.map(post => (
          <article 
            key={post.id} 
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => window.location.href = post.link}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-amber-200">{post.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
            <div className="mt-3 flex items-center text-amber-400 text-sm">
              阅读全文
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-amber-400 hover:text-amber-300 transition-colors">
          查看更多文章
        </button>
      </div>
    </div>
  );
};

export default BlogSection; 