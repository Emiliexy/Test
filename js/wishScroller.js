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
    "世界和平"
];

function generateRandomId() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return '莲友' + result;
}

function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

function initWishScroller() {
    const wishScrollerElement = document.getElementById('wishScroller');
    if (!wishScrollerElement) {
        console.error('祈愿台元素未找到');
        return;
    }

    console.log('初始化祈愿台');
    
    // 创建标题
    const title = document.createElement('h2');
    title.className = 'text-xl font-semibold mb-4 pb-2 border-b-2 border-[#d4af37]';
    title.textContent = '佛光祈愿台';
    wishScrollerElement.appendChild(title);

    // 创建滚动区域
    const scrollArea = document.createElement('div');
    scrollArea.className = 'wishes-scroll-area';
    wishScrollerElement.appendChild(scrollArea);

    // 获取已保存的祈愿
    const savedWishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    
    // 为默认祈愿添加用户信息
    const defaultWishesWithInfo = DEFAULT_WISHES.map(content => ({
        id: Date.now().toString() + Math.random(),
        content: content,
        user: generateRandomId(),
        time: formatDate(),
        likes: 0
    }));

    // 合并默认祈愿和保存的祈愿，确保格式一致
    const allWishes = [...savedWishes, ...defaultWishesWithInfo].map(wish => ({
        id: wish.id || Date.now().toString() + Math.random(),
        content: wish.content || wish.text || '',
        user: wish.user || wish.userId || generateRandomId(),
        time: wish.time || formatDate(wish.date) || formatDate(),
        likes: wish.likes || 0
    }));

    // 修改显示数量
    let currentIndex = 0;
    const visibleCount = 3;  // 同时显示3个祈愿

    function initializeWishes() {
        // 清空现有内容
        scrollArea.innerHTML = '';
        // 显示初始的3个愿望
        for (let i = 0; i < visibleCount; i++) {
            const wishIndex = (currentIndex + i) % allWishes.length;
            const wishElement = createWishElement(allWishes[wishIndex]);
            scrollArea.appendChild(wishElement);
        }
    }

    function createWishElement(wish) {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        wishElement.innerHTML = `
            <div class="wish-header">
                <span class="wish-user">${wish.user}</span>
                <span class="wish-time">${wish.time}</span>
            </div>
            <div class="wish-content">${wish.content}</div>
            <div class="wish-footer">
                <button class="wish-like-btn">
                    <span class="like-icon">🤲</span>
                    <span class="like-count">${wish.likes}</span>
                </button>
            </div>
        `;
        return wishElement;
    }

    function smoothScroll() {
        // 移除第一个元素
        const firstElement = scrollArea.firstChild;
        if (firstElement) {
            firstElement.style.transition = 'all 1s ease-in-out';
            firstElement.style.opacity = '0';
            firstElement.style.transform = 'translateY(-100%)';
            setTimeout(() => firstElement.remove(), 1000);
        }

        // 获取下一个要显示的愿望
        const nextIndex = (currentIndex + visibleCount) % allWishes.length;
        const nextWish = allWishes[nextIndex];
        const newWish = createWishElement(nextWish);
        
        // 设置初始状态
        newWish.style.opacity = '0';
        newWish.style.transform = 'translateY(20px)';
        scrollArea.appendChild(newWish);

        // 触发动画
        requestAnimationFrame(() => {
            newWish.style.transition = 'all 1s ease-in-out';
            newWish.style.opacity = '1';
            newWish.style.transform = 'translateY(0)';
        });

        // 更新索引
        currentIndex = (currentIndex + 1) % allWishes.length;
    }

    // 初始化显示
    initializeWishes();

    // 开始定时滚动
    setInterval(smoothScroll, 4000);
}

// 确保在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initWishScroller); 