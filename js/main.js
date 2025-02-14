document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，开始初始化...');

    // 首先获取所有需要的DOM元素
    const submitWish = document.getElementById('submitWish');
    const directWorship = document.getElementById('directWorship');
    const wishInput = document.getElementById('wishInput');
    const buddhaImage = document.getElementById('buddhaImage');
    const lightEffect = document.querySelector('.light-effect');
    const bellSound = document.getElementById('bellSound');
    const soundToggle = document.getElementById('soundToggle');
    const volumeSlider = document.getElementById('volumeSlider');

    console.log('DOM元素检查:', {
        submitWish: !!submitWish,
        wishInput: !!wishInput,
        buddhaImage: !!buddhaImage,
        lightEffect: !!lightEffect,
        bellSound: !!bellSound,
        soundToggle: !!soundToggle,
        volumeSlider: !!volumeSlider
    });

    if (!submitWish || !wishInput) {
        console.error('找不到祈愿相关的DOM元素');
        return;
    }

    // 音效状态和音量
    let isSoundMuted = localStorage.getItem('isSoundMuted') === 'true';
    let soundVolume = parseFloat(localStorage.getItem('soundVolume') || '0.7');
    
    // 初始化音频并添加调试信息
    console.log('正在初始化音频...');
    bellSound.volume = soundVolume;
    
    // 测试音频加载状态
    console.log('音频源:', bellSound.src);
    console.log('音频就绪状态:', bellSound.readyState);
    console.log('音频音量:', bellSound.volume);
    
    // 音频错误处理
    bellSound.onerror = function(e) {
        console.error('音频加载错误:', e);
        console.error('错误代码:', bellSound.error.code);
        showMessage('音频加载失败，请刷新页面重试');
    };

    // 音频加载成功处理
    bellSound.oncanplaythrough = function() {
        console.log('音频加载完成，可以播放');
    };

    updateSoundButtonState();

    // 音效开关点击事件
    soundToggle.addEventListener('click', async () => {
        try {
            isSoundMuted = !isSoundMuted;
            localStorage.setItem('isSoundMuted', isSoundMuted);
            updateSoundButtonState();
            
            if (isSoundMuted) {
                // 静音时暂停音频
                bellSound.pause();
                bellSound.currentTime = 0;
                soundToggle.querySelector('.sound-text').textContent = '暂停中';
            } else {
                // 取消静音时播放音频
                playTestSound();
                soundToggle.querySelector('.sound-text').textContent = '唱诵中';
            }
        } catch (error) {
            console.error('音频控制错误:', error);
            showMessage('请点击页面以启用音效');
        }
    });

    // 播放钟声
    async function playBellSound() {
        if (!isSoundMuted) {
            try {
                console.log('尝试播放音频...');
                console.log('当前音频状态:', bellSound.readyState);
                console.log('当前音量:', bellSound.volume);
                
                bellSound.currentTime = 0;
                bellSound.volume = soundVolume;
                
                const playPromise = bellSound.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('音频播放成功');
                    }).catch(error => {
                        console.error('音频播放失败:', error);
                        // 如果是自动播放策略阻止，尝试在用户交互后播放
                        if (error.name === 'NotAllowedError') {
                            showMessage('请点击页面任意处以启用音效');
                            // 添加一次性点击事件来播放音频
                            const playOnClick = () => {
                                bellSound.play().catch(e => console.error('二次尝试失败:', e));
                                document.removeEventListener('click', playOnClick);
                            };
                            document.addEventListener('click', playOnClick);
                        }
                    });
                }
            } catch (error) {
                console.error('播放过程出错:', error);
            }
        } else {
            console.log('音频已静音');
        }
    }

    // 测试播放声音
    async function playTestSound() {
        try {
            console.log('测试音频播放...');
            bellSound.currentTime = 0;
            bellSound.volume = soundVolume;
            await bellSound.play();
            console.log('测试播放成功');
        } catch (error) {
            console.error('测试播放失败:', error);
            showMessage('请点击页面以启用音效');
        }
    }

    // 音频控制相关代码
    function initializeAudio() {
        console.log('初始化音频设置...');
        const bellSound = document.getElementById('bellSound');
        const soundToggle = document.getElementById('soundToggle');
        const volumeSlider = document.getElementById('volumeSlider');

        // 设置初始音量为较小值，避免突兀
        const initialVolume = 0.3;
        bellSound.volume = initialVolume;
        volumeSlider.value = initialVolume * 100;

        // 淡入播放音频
        function fadeInAudio(duration = 2000) {
            let startVolume = 0;
            const targetVolume = initialVolume;
            const steps = 50;
            const volumeStep = targetVolume / steps;
            const timeStep = duration / steps;

            bellSound.volume = startVolume;
            
            const fadeInterval = setInterval(() => {
                startVolume = Math.min(targetVolume, startVolume + volumeStep);
                bellSound.volume = startVolume;
                
                if (startVolume >= targetVolume) {
                    clearInterval(fadeInterval);
                }
            }, timeStep);
        }

        // 页面加载完成后尝试自动播放
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                // 先将音量设为0
                bellSound.volume = 0;
                const playPromise = bellSound.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // 自动播放成功，开始淡入
                        fadeInAudio();
                        soundToggle.classList.remove('muted');
                    }).catch(error => {
                        // 自动播放失败，等待用户交互
                        console.log("等待用户交互以启用音频");
                        soundToggle.classList.add('muted');
                        
                        // 添加一次性点击事件来启用音频
                        const enableAudio = () => {
                            bellSound.play().then(() => {
                                fadeInAudio();
                                soundToggle.classList.remove('muted');
                            });
                            document.removeEventListener('click', enableAudio);
                        };
                        document.addEventListener('click', enableAudio);
                    });
                }
            } catch (error) {
                console.error('音频初始化失败:', error);
            }
        });

        // 音量控制
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            bellSound.volume = volume;
            
            if (volume === 0) {
                soundToggle.classList.add('muted');
            } else {
                soundToggle.classList.remove('muted');
            }
        });

        // 音频循环播放时的淡入淡出效果
        bellSound.addEventListener('timeupdate', () => {
            const duration = bellSound.duration;
            const currentTime = bellSound.currentTime;
            const fadeOutStart = duration - 2; // 在结束前2秒开始淡出
            
            if (currentTime >= fadeOutStart) {
                const fadeOutDuration = duration - fadeOutStart;
                const volume = initialVolume * ((duration - currentTime) / fadeOutDuration);
                bellSound.volume = Math.max(0, volume);
            }
        });

        // 音频循环播放
        bellSound.addEventListener('ended', () => {
            bellSound.currentTime = 0;
            bellSound.volume = 0;
            bellSound.play().then(() => {
                fadeInAudio(1000); // 新的循环从淡入开始
            });
        });

        // 音效开关
        soundToggle.addEventListener('click', () => {
            if (bellSound.paused) {
                bellSound.volume = 0;
                bellSound.play().then(() => {
                    fadeInAudio();
                    soundToggle.classList.remove('muted');
                });
            } else {
                // 淡出后暂停
                const fadeOutAudio = setInterval(() => {
                    if (bellSound.volume > 0.1) {
                        bellSound.volume -= 0.1;
                    } else {
                        bellSound.pause();
                        bellSound.volume = 0;
                        clearInterval(fadeOutAudio);
                        soundToggle.classList.add('muted');
                    }
                }, 100);
            }
        });
    }

    // 更新音效按钮状态
    function updateSoundButtonState() {
        soundToggle.classList.toggle('muted', isSoundMuted);
        soundToggle.querySelector('.sound-icon').textContent = isSoundMuted ? '🔕' : '🔔';
        soundToggle.querySelector('.sound-text').textContent = isSoundMuted ? '暂停中' : '唱诵中';
        soundToggle.title = isSoundMuted ? '开启音效' : '关闭音效';
    }

    // 佛学小语数组
    const wisdomTexts = [
        "心若无尘，何处不清净",
        "放下执着，随缘自在",
        "慈悲喜舍，利益众生",
        "心净则国土净",
        "诸恶莫作，众善奉行",
        "心安即是归处",
        "随缘不变，不变随缘",
        "心中有佛，处处光明"
    ];

    // 初始化
    initializeApp();

    // 长按处理函数
    function handleLongPress(button, callback) {
        let pressTimer;
        let isPressed = false;
        const chantingGuide = document.querySelector('.chanting-guide');
        const clickHint = document.querySelector('.click-hint');
        let clickTimeout;

        button.addEventListener('mousedown', startPress);
        button.addEventListener('touchstart', startPress);
        button.addEventListener('mouseup', endPress);
        button.addEventListener('touchend', endPress);
        button.addEventListener('mouseleave', endPress);

        // 添加点击事件监听
        button.addEventListener('click', (e) => {
            // 如果是祈愿按钮，检查输入框
            if (button.id === 'submitWish') {
                const wish = wishInput.value.trim();
                if (!wish) {
                    showMessage('请先写下您的心愿...');
                    return;
                }
            }

            // 显示提示
            clickHint.classList.add('show');
            // 2秒后隐藏提示
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                clickHint.classList.remove('show');
            }, 2000);
        });

        function startPress(e) {
            if (e.type === 'touchstart') {
                e.preventDefault();
            }

            // 如果是祈愿按钮，检查输入框
            if (button.id === 'submitWish') {
                const wish = wishInput.value.trim();
                if (!wish) {
                    showMessage('请先写下您的心愿...');
                    return;
                }
            }

            isPressed = true;
            button.classList.add('pressing');
            chantingGuide.classList.add('show');
            clickHint.classList.remove('show');  // 开始长按时隐藏点击提示

            pressTimer = setTimeout(() => {
                if (isPressed) {
                    button.classList.remove('pressing');
                    chantingGuide.classList.remove('show');
                    callback();
                }
            }, 3000);
        }

        function endPress() {
            isPressed = false;
            clearTimeout(pressTimer);
            button.classList.remove('pressing');
            chantingGuide.classList.remove('show');
        }
    }

    // 处理祈愿提交
    handleLongPress(submitWish, async () => {
        const wish = wishInput.value.trim();
        if (!wish) {
            showMessage('请先写下您的心愿...');
            return;
        }

        try {
            // 使用相同的发光效果
            performDirectWorship();

            // 播放音效
            if (!isSoundMuted && bellSound) {
                if (!bellSound.paused) {
                    bellSound.currentTime = 0;
                }
                await bellSound.play();
            }

            // 清空输入框
            wishInput.value = '';
            
            // 更新字数统计
            if (wordCount) {
                wordCount.textContent = '0/100';
                wordCount.style.color = '#999';
            }

        } catch (error) {
            console.error('祈愿过程出错:', error);
            showMessage('祈愿过程出现问题，请重试');
        }
    });

    // 播放拜拜动画
    function playWorshipAnimation() {
        const buddhaImage = document.querySelector('.buddha-image');
        buddhaImage.classList.add('worshipping');
        setTimeout(() => {
            buddhaImage.classList.remove('worshipping');
        }, 2000);
    }

    // 创建多个光晕效果
    function createMultipleGlowEffects() {
        const container = document.querySelector('.buddha-image');
        if (!container) return;

        const numEffects = 3;
        for (let i = 0; i < numEffects; i++) {
            const glowEffect = document.createElement('div');
            glowEffect.className = 'light-effect';
            glowEffect.style.opacity = '0';
            glowEffect.style.transform = `scale(${0.8 + i * 0.2})`;
            glowEffect.style.animation = `glowEffect ${1.5 + i * 0.5}s ease-out`;
            container.appendChild(glowEffect);
            
            // 动画结束后移除元素
            setTimeout(() => {
                glowEffect.remove();
            }, (1.5 + i * 0.5) * 1000);
        }
    }

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glow {
            0% {
                opacity: 0;
                transform: translateX(-50%) scale(0.8);
            }
            50% {
                opacity: 0.5;
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) scale(2);
            }
        }
    `;
    document.head.appendChild(style);

    // 初始化应用
    function initializeApp() {
        console.log('初始化应用...');
        
        // 设置每日佛学小语
        const dailyWisdom = document.getElementById('dailyWisdom');
        if (dailyWisdom) {
            setDailyWisdom();
        }

        // 加载签到数据
        loadCheckInData();

        // 初始化点赞功能
        initLikeFeature();

        // 加载祈愿列表
        loadWishes();
    }

    // 加载签到数据
    function loadCheckInData() {
        const checkInDays = document.getElementById('checkInDays');
        // 只在元素存在时更新签到数据
        if (checkInDays) {
            const days = localStorage.getItem('checkInDays') || '0';
            checkInDays.textContent = days;
        }
    }

    // 处理签到
    function handleCheckIn() {
        const checkInDays = document.getElementById('checkInDays');
        if (!checkInDays) return;  // 如果元素不存在，直接返回

        const today = new Date().toLocaleDateString();
        const lastCheckIn = localStorage.getItem('lastCheckIn');
        
        if (lastCheckIn !== today) {
            const days = parseInt(localStorage.getItem('checkInDays') || '0') + 1;
            localStorage.setItem('checkInDays', days);
            localStorage.setItem('lastCheckIn', today);
            checkInDays.textContent = days;
            
            showMessage('签到成功！愿您平安喜乐');
        } else {
            showMessage('今日已签到，明天再来！');
        }
    }

    // 设置每日佛学小语
    function setDailyWisdom() {
        const dailyWisdom = document.getElementById('dailyWisdom');
        if (!dailyWisdom) return;  // 如果元素不存在，直接返回

        const today = new Date().toLocaleDateString();
        const index = Math.floor(
            (new Date(today).getTime() / (24 * 60 * 60 * 1000)) % wisdomTexts.length
        );
        dailyWisdom.textContent = wisdomTexts[index];
    }

    // 生成随机用户标识
    function generateUserId() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        // 生成5位随机字符
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        return `莲友 ${result.toUpperCase()}`; // 转换为大写以提高可读性
    }

    // 格式化日期
    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    // 修改点赞事件处理
    function initLikeFeature() {
        const wishScroller = document.getElementById('wishScroller');
        
        wishScroller.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.wish-like-btn');
            if (!likeBtn) return;

            // 获取祈愿项和ID
            const wishItem = likeBtn.closest('.wish-item');
            const wishId = wishItem.dataset.id;
            
            // 更新UI
            const likeIcon = likeBtn.querySelector('.like-icon');
            const likeCount = likeBtn.querySelector('.like-count');
            const currentLikes = parseInt(likeCount.textContent || '0');
            
            // 更新本地存储
            const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
            const wishIndex = wishes.findIndex(w => w.id === wishId);
            
            if (wishIndex !== -1) {
                // 累加点赞数
                wishes[wishIndex].likes = (wishes[wishIndex].likes || 0) + 1;
                localStorage.setItem('wishes', JSON.stringify(wishes));
                
                // 更新UI显示
                likeBtn.classList.add('liked');
                likeIcon.textContent = '🙏';
                likeCount.textContent = wishes[wishIndex].likes;
                
                // 添加点赞动画
                const particle = document.createElement('span');
                particle.className = 'like-particle';
                particle.textContent = '🙏';
                likeBtn.appendChild(particle);
                
                // 移除动画元素
                setTimeout(() => particle.remove(), 1000);
            }
        });
    }

    // 修改加载祈愿列表函数
    function loadWishes() {
        const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
        const wishScroller = document.getElementById('wishScroller');
        const scrollArea = wishScroller?.querySelector('.wishes-scroll-area');
        
        if (scrollArea) {
            scrollArea.innerHTML = wishes.map(wish => {
                const userId = wish.user || generateUserId();
                const totalLikes = wish.likes || 0;  // 获取累计点赞数
                
                return `
                    <div class="wish-item" data-id="${wish.id}">
                        <div class="wish-header">
                            <span class="wish-user">${userId}</span>
                            <span class="wish-time">${wish.time || formatDate(wish.date)}</span>
                        </div>
                        <div class="wish-content">${wish.content || wish.text}</div>
                        <div class="wish-footer">
                            <button class="wish-like-btn">
                                <span class="like-icon">${totalLikes > 0 ? '🙏' : '🤲'}</span>
                                <span class="like-count">${totalLikes}</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            
            // 初始化滚动效果
            initWishScroller();
        }
    }

    // 显示消息提示
    function showMessage(message, duration = 3000) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 1000;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, duration);
    }

    // 添加自动滚动功能
    function initWishScroller() {
        const scrollArea = document.querySelector('.wishes-scroll-area');
        const scrollSpeed = 1; // 滚动速度（像素/帧）
        let isScrolling = true;

        // 设置滚动区域的样式
        scrollArea.style.position = 'relative';
        scrollArea.style.overflow = 'hidden';

        function autoScroll() {
            if (!isScrolling) return;

            // 获取第一个祈愿元素
            const firstWish = scrollArea.firstElementChild;
            if (!firstWish) return;

            // 当第一个元素完全滚出可视区域时
            if (firstWish.offsetTop + firstWish.offsetHeight < 0) {
                // 将第一个元素移到底部
                scrollArea.appendChild(firstWish);
                // 重置位置
                firstWish.style.transform = 'translateY(0)';
            }

            // 移动所有元素
            Array.from(scrollArea.children).forEach(wish => {
                const currentY = parseFloat(wish.style.transform?.split('(')[1] || 0);
                wish.style.transform = `translateY(${currentY - scrollSpeed}px)`;
            });

            requestAnimationFrame(autoScroll);
        }

        // 鼠标悬停时暂停滚动
        scrollArea.addEventListener('mouseenter', () => {
            isScrolling = false;
        });

        // 鼠标离开时恢复滚动
        scrollArea.addEventListener('mouseleave', () => {
            isScrolling = true;
            requestAnimationFrame(autoScroll);
        });

        // 开始滚动
        requestAnimationFrame(autoScroll);
    }

    // 添加直接行拜礼功能
    function performDirectWorship() {
        // 添加光效
        buddhaImage.classList.add('worshipping');
        lightEffect.style.opacity = '1';
        setTimeout(() => {
            buddhaImage.classList.remove('worshipping');
            lightEffect.style.opacity = '0';
        }, 2000);

        // 显示祈福信息
        showMessage('阿弥陀佛，愿您心想事成，福慧双修 🙏');
    }

    // 绑定直接行拜礼按钮事件
    if (directWorship) {
        handleLongPress(directWorship, performDirectWorship);
    }

    // 添加字数统计功能
    const wordCount = document.querySelector('.word-count');
    wishInput.addEventListener('input', () => {
        const length = wishInput.value.length;
        wordCount.textContent = `${length}/100`;
        
        // 接近字数限制时改变颜色
        if (length >= 90) {
            wordCount.style.color = '#ff4444';
        } else {
            wordCount.style.color = '#999';
        }
    });
}); 