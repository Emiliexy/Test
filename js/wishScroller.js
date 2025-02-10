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

// 修改点赞功能
function initLikeButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.wish-like-btn')) {
            const likeBtn = e.target.closest('.wish-like-btn');
            const likeCount = likeBtn.querySelector('.like-count');
            const likeIcon = likeBtn.querySelector('.like-icon');
            const currentCount = parseInt(likeCount.textContent);
            
            // 切换点赞状态
            if (likeBtn.classList.contains('liked')) {
                likeBtn.classList.remove('liked');
                likeCount.textContent = currentCount - 1;
                likeIcon.textContent = '🤲';  // 修改这里：取消点赞时恢复为合掌
            } else {
                likeBtn.classList.add('liked');
                likeCount.textContent = currentCount + 1;
                likeIcon.textContent = '🙏';  // 点赞时变为合掌
                
                // 添加点赞动画效果
                createLikeParticle(likeBtn);
            }
            
            // 保存点赞状态到本地存储
            saveLikeStatus(likeBtn.closest('.wish-item').dataset.wishId, likeBtn.classList.contains('liked'));
        }
    });
}

// 创建点赞动画效果
function createLikeParticle(button) {
    const particle = document.createElement('span');
    particle.className = 'like-particle';
    particle.innerHTML = '🙏';  // 使用合掌emoji
    
    // 设置初始位置
    const rect = button.getBoundingClientRect();
    particle.style.left = rect.left + rect.width / 2 + 'px';
    particle.style.top = rect.top + 'px';
    
    document.body.appendChild(particle);
    
    // 动画结束后移除元素
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// 保存点赞状态
function saveLikeStatus(wishId, isLiked) {
    const likeStatus = JSON.parse(localStorage.getItem('wishLikes') || '{}');
    likeStatus[wishId] = isLiked;
    localStorage.setItem('wishLikes', JSON.stringify(likeStatus));
}

// 获取点赞状态
function getLikeStatus(wishId) {
    const likeStatus = JSON.parse(localStorage.getItem('wishLikes') || '{}');
    return likeStatus[wishId] || false;
}

// 修改创建祈愿卡片的函数
function createWishElement(wish) {
    const wishElement = document.createElement('div');
    wishElement.className = 'wish-item';
    wishElement.dataset.wishId = wish.id;  // 添加wishId用于识别
    
    // 获取该愿望的点赞状态
    const isLiked = getLikeStatus(wish.id);
    const likeIcon = isLiked ? '🙏' : '🤲';  // 修改这里：初始状态改为 🤲
    const likedClass = isLiked ? 'liked' : '';
    
    wishElement.innerHTML = `
        <div class="wish-header">
            <span class="wish-user">${wish.user}</span>
            <span class="wish-time">${wish.time}</span>
        </div>
        <div class="wish-content">${wish.content}</div>
        <div class="wish-footer">
            <button class="wish-like-btn ${likedClass}">
                <span class="like-icon">${likeIcon}</span>
                <span class="like-count">${wish.likes}</span>
            </button>
        </div>
    `;
    return wishElement;
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

    // 初始化祈愿列表
    function initializeWishes() {
        const scrollArea = document.querySelector('.wishes-scroll-area');
        if (!scrollArea) return;

        // 确保至少有两倍visibleCount数量的祈愿
        const minWishes = visibleCount * 2;
        while (allWishes.length < minWishes) {
            allWishes = [...allWishes, ...DEFAULT_WISHES.map(content => ({
                id: Date.now().toString() + Math.random(),
                content,
                user: generateRandomId(),
                time: formatDate(),
                likes: 0
            }))];
        }

        // 初始显示
        for (let i = 0; i < visibleCount; i++) {
            const wish = allWishes[i];
            const wishElement = createWishElement(wish);
            scrollArea.appendChild(wishElement);
        }

        // 启动自动滚动
        startAutoScroll(scrollArea);
    }

    // 自动滚动功能
    function startAutoScroll(scrollArea) {
        const scrollSpeed = 1; // 滚动速度（像素/帧）
        let isScrolling = true;
        let lastTimestamp = 0;

        function scroll(timestamp) {
            if (!isScrolling) {
                lastTimestamp = timestamp;
                requestAnimationFrame(scroll);
                return;
            }

            // 计算时间差，保持平滑滚动
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            // 获取所有祈愿元素
            const wishes = Array.from(scrollArea.children);
            if (wishes.length === 0) return;

            // 移动第一个元素
            const firstWish = wishes[0];
            const currentTransform = parseFloat(firstWish.style.transform?.split('translateY(')[1] || 0);
            const newTransform = currentTransform - scrollSpeed * (deltaTime / 16); // 基于60fps标准化速度

            // 当第一个元素完全滚出可视区域时
            if (newTransform <= -firstWish.offsetHeight) {
                // 创建新的祈愿元素
                const nextIndex = (currentIndex + visibleCount) % allWishes.length;
                const nextWish = allWishes[nextIndex];
                const newWishElement = createWishElement(nextWish);
                
                // 设置初始位置
                newWishElement.style.transform = `translateY(${wishes[wishes.length - 1].offsetHeight}px)`;
                newWishElement.style.opacity = '0';
                
                // 添加到底部
                scrollArea.appendChild(newWishElement);

                // 触发动画
                requestAnimationFrame(() => {
                    newWishElement.style.transition = 'all 1s ease-in-out';
                    newWishElement.style.opacity = '1';
                    newWishElement.style.transform = 'translateY(0)';
                });

                // 移除第一个元素
                firstWish.style.transition = 'all 1s ease-in-out';
                firstWish.style.opacity = '0';
                setTimeout(() => firstWish.remove(), 1000);

                // 更新索引
                currentIndex = (currentIndex + 1) % allWishes.length;
            } else {
                // 继续移动所有元素
                wishes.forEach(wish => {
                    wish.style.transform = `translateY(${newTransform}px)`;
                });
            }

            requestAnimationFrame(scroll);
        }

        // 鼠标悬停时暂停滚动
        scrollArea.addEventListener('mouseenter', () => {
            isScrolling = false;
        });

        // 鼠标离开时恢复滚动
        scrollArea.addEventListener('mouseleave', () => {
            isScrolling = true;
        });

        // 开始滚动
        requestAnimationFrame(scroll);
    }

    // 初始化显示
    initializeWishes();

    // 初始化点赞功能
    initLikeButtons();

    // 添加处理新愿望的方法
    window.addNewWish = function(content) {
        console.log('addNewWish 被调用:', content);
        const newWish = {
            id: Date.now().toString() + Math.random(),
            content: content,
            user: generateRandomId(),
            time: formatDate(),
            likes: 0
        };

        // 将新愿望添加到数组开头
        allWishes.unshift(newWish);

        // 立即显示新愿望
        const scrollArea = document.querySelector('.wishes-scroll-area');
        if (scrollArea) {
            const newWishElement = createWishElement(newWish);
            
            // 设置初始状态
            newWishElement.style.opacity = '0';
            newWishElement.style.transform = 'translateY(20px)';
            
            // 插入到开头
            if (scrollArea.firstChild) {
                scrollArea.insertBefore(newWishElement, scrollArea.firstChild);
            } else {
                scrollArea.appendChild(newWishElement);
            }

            // 触发动画
            requestAnimationFrame(() => {
                newWishElement.style.transition = 'all 1s ease-in-out';
                newWishElement.style.opacity = '1';
                newWishElement.style.transform = 'translateY(0)';
            });

            // 如果显示的愿望超过限制，移除最后一个
            if (scrollArea.children.length > visibleCount) {
                const lastElement = scrollArea.lastChild;
                lastElement.style.transition = 'all 1s ease-in-out';
                lastElement.style.opacity = '0';
                lastElement.style.transform = 'translateY(100%)';
                setTimeout(() => lastElement.remove(), 1000);
            }

            // 保存到本地存储
            const savedWishes = JSON.parse(localStorage.getItem('wishes') || '[]');
            savedWishes.unshift(newWish);
            localStorage.setItem('wishes', JSON.stringify(savedWishes));
            
            console.log('新祈愿添加完成');
        } else {
            console.error('找不到 wishes-scroll-area 元素');
        }
    };
}

// 确保在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initWishScroller); 