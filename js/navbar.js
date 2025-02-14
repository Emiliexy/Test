function initNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'nav-bar';
  navbar.innerHTML = `
    <div class="nav-container">
      <div class="nav-content">
        <!-- Logo区域 -->
        <a href="/" class="nav-logo">
          <img src="./images/logo.png" alt="观世音在线" class="logo-image">
          <span class="logo-text">
            <span class="logo-main">
              Brahmasound
              <span>梵海清音</span>
            </span>
            <span class="logo-sub">在线礼佛平台</span>
          </span>
        </a>
        
        <!-- 导航链接 -->
        <div class="nav-links">
          <a href="#worship" class="nav-link">礼拜观音</a>
          <a href="#sutra" class="nav-link">诵经念佛</a>
          <a href="#blog" class="nav-link">佛法修行</a>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <button class="menu-button">
          <svg class="menu-icon" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- 移动端菜单 -->
      <div class="mobile-menu">
        <a href="#worship" class="mobile-link">礼拜观音</a>
        <a href="#sutra" class="mobile-link">诵经念佛</a>
        <a href="#blog" class="mobile-link">佛法修行</a>
      </div>
    </div>
  `;

  // 插入到页面顶部
  document.body.insertBefore(navbar, document.body.firstChild);

  // 移动端菜单切换
  const menuButton = navbar.querySelector('.menu-button');
  const mobileMenu = navbar.querySelector('.mobile-menu');
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    menuButton.classList.toggle('active');
  });
}

document.addEventListener('DOMContentLoaded', initNavbar); 