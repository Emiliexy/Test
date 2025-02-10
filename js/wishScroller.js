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

    function smoothScroll() {
        const scrollArea = document.querySelector('.wishes-scroll-area');
        if (!scrollArea) {
            console.error('找不到滚动区域元素');
            return;
        }

        // 使用 firstElementChild 替代 firstChild
        const firstElement = scrollArea.firstElementChild;
        if (!firstElement) {
            console.log('没有可滚动的元素');
            return;
        }

        try {
            // 设置过渡动画
            firstElement.style.transition = 'all 1s ease-in-out';
            firstElement.style.opacity = '0';
            firstElement.style.transform = 'translateY(-100%)';

            // 延迟移除元素
            setTimeout(() => {
                if (firstElement.parentNode) {
                    firstElement.remove();
                }
            }, 1000);

            // 获取下一个要显示的愿望
            const nextIndex = (currentIndex + visibleCount) % allWishes.length;
            const nextWish = allWishes[nextIndex];
            if (!nextWish) {
                console.error('找不到下一个愿望');
                return;
            }

            const newWish = createWishElement(nextWish);
            if (!newWish) {
                console.error('创建新愿望元素失败');
                return;
            }
            
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
        } catch (error) {
            console.error('滚动动画出错:', error);
        }
    }

    // 初始化显示
    initializeWishes();

    // 开始定时滚动，添加错误处理
    const scrollInterval = setInterval(() => {
        try {
            smoothScroll();
        } catch (error) {
            console.error('滚动出错:', error);
            // 可选：清除定时器
            // clearInterval(scrollInterval);
        }
    }, 4000);

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