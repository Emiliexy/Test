const BLOG_POSTS = [
  {
    id: 1,
    title: '观音诞如何拜拜？详细指南与习俗解读',
    excerpt: '观音诞是纪念观世音菩萨的重要节日，本文详细介绍了观音诞的文化背景、拜拜习俗与正确步骤，帮助信徒更好地表达虔诚...',
    date: '2025-02-12',
    link: '/blog/guanyin-dan-bai-bai-zheng-que-fang-shi.html',
    thumbnail: './images/guanyin-temple.jpg'
  },
  {
    id: 2,
    title: '观世音菩萨是谁？普陀山与菩萨的慈悲',
    excerpt: '在佛教文化中，观世音菩萨是大慈大悲的象征，她普渡众生、化解苦难，是许多信徒心中的庇护神。她被广泛崇敬，尤其在中国，拥有众多信徒...',
    date: '2025-02-12',
    link: '/blog/who-is-guan-yin.html',
    thumbnail: './images/putuo-temple.jpg'
  }
];

function initBlogSection() {
  const blogContainer = document.createElement('div');
  blogContainer.className = 'blog-section';
  blogContainer.innerHTML = `
    <h2 class="module-title">佛法修行</h2>
    <div class="blog-grid">
      ${BLOG_POSTS.map(post => `
        <article class="blog-card" data-link="${post.link}">
          ${post.thumbnail ? `
            <div class="blog-thumbnail">
              <img src="${post.thumbnail}" alt="${post.title}的配图" />
            </div>
          ` : ''}
          <div class="blog-content">
            <div class="blog-header">
              <h3 class="blog-title">${post.title}</h3>
              <div class="blog-meta">
                <span>${post.date}</span>
              </div>
            </div>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="read-more">
              阅读全文 →
            </div>
          </div>
        </article>
      `).join('')}
    </div>
    <div class="blog-footer">
      <button class="view-more-btn">查看更多文章</button>
    </div>
  `;

  // 添加到经文诵读模块后面
  const sutraReader = document.querySelector('.sutra-reader');
  if (sutraReader) {
    sutraReader.parentNode.insertBefore(blogContainer, sutraReader.nextSibling);
  }

  // 添加点击事件
  const blogCards = blogContainer.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.dataset.link;
      if (link.startsWith('/')) {
        // 移除开头的斜杠以适应相对路径
        window.location.href = '.' + link;
      } else {
        window.location.href = link;
      }
    });
  });
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initBlogSection); 