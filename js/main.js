document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const buddhaImage = document.getElementById('buddhaImage');
    const lightEffect = document.querySelector('.light-effect');
    const worshipButton = document.getElementById('worshipButton');
    const checkInButton = document.getElementById('checkInButton');
    const wishInput = document.getElementById('wishInput');
    const submitWish = document.getElementById('submitWish');
    const wishesList = document.getElementById('wishesList');
    const checkInDays = document.getElementById('checkInDays');
    const dailyWisdom = document.getElementById('dailyWisdom');
    const bellSound = document.getElementById('bellSound');
    const soundToggle = document.getElementById('soundToggle');

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
        showMessage('音效已就绪');
    };

    updateSoundButtonState();

    // 音效开关点击事件
    soundToggle.addEventListener('click', async () => {
        try {
            isSoundMuted = !isSoundMuted;
            localStorage.setItem('isSoundMuted', isSoundMuted);
            updateSoundButtonState();
            
            if (isSoundMuted) {
                bellSound.pause();
                bellSound.currentTime = 0;
            } else {
                // 切换到播放状态时播放完整音效
                playTestSound();
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

    // 初始化音频设置
    function initializeAudio() {
        console.log('初始化音频设置...');
        bellSound.volume = soundVolume;
        
        // 预加载音频
        bellSound.load();
        
        // 音频事件监听
        bellSound.addEventListener('loadeddata', () => {
            console.log('音频数据加载完成');
        });
        
        bellSound.addEventListener('canplaythrough', () => {
            console.log('音频可以流畅播放');
        });
        
        bellSound.addEventListener('play', () => {
            console.log('开始播放');
        });
        
        bellSound.addEventListener('ended', () => {
            console.log('播放结束');
        });
        
        bellSound.addEventListener('error', (e) => {
            console.error('音频错误:', e);
        });
    }

    // 更新音效按钮状态
    function updateSoundButtonState() {
        soundToggle.classList.toggle('muted', isSoundMuted);
        soundToggle.querySelector('.sound-icon').textContent = isSoundMuted ? '🔕' : '🔔';
        soundToggle.querySelector('.sound-text').textContent = isSoundMuted ? '静音中' : '唱诵中';
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

    // 拜拜按钮点击事件
    worshipButton.addEventListener('click', () => {
        playWorshipAnimation();
        playBellSound();
        saveWorshipRecord();
    });

    // 签到按钮点击事件
    checkInButton.addEventListener('click', () => {
        handleCheckIn();
    });

    // 提交祈愿按钮点击事件
    submitWish.addEventListener('click', () => {
        handleWishSubmission();
    });

    // 初始化应用
    function initializeApp() {
        loadCheckInData();
        loadWishes();
        setDailyWisdom();
        initializeAudio();
    }

    // 播放拜拜动画
    function playWorshipAnimation() {
        // 添加光效果
        lightEffect.style.opacity = '1';
        
        // 添加图像效果
        buddhaImage.classList.add('worshipping');
        buddhaImage.style.transform = 'scale(1.02)';
        
        // 创建多个光晕效果
        createMultipleGlowEffects();
        
        // 恢复初始状态
        setTimeout(() => {
            lightEffect.style.opacity = '0';
            buddhaImage.classList.remove('worshipping');
            buddhaImage.style.transform = 'scale(1)';
        }, 2000);
    }

    // 创建多个光晕效果
    function createMultipleGlowEffects() {
        const numEffects = 3;
        const container = document.querySelector('.buddha-image');
        
        for (let i = 0; i < numEffects; i++) {
            const glowEffect = document.createElement('div');
            glowEffect.className = 'light-effect';
            glowEffect.style.opacity = '0';
            glowEffect.style.transform = `translateX(-50%) scale(${0.8 + i * 0.2})`;
            glowEffect.style.animation = `glow ${1.5 + i * 0.5}s ease-out`;
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

    // 处理签到
    function handleCheckIn() {
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

    // 处理祈愿提交
    function handleWishSubmission() {
        const wishText = wishInput.value.trim();
        if (wishText) {
            // 获取或生成用户ID
            let userId = localStorage.getItem('userId');
            if (!userId) {
                userId = generateUserId();
                localStorage.setItem('userId', userId);
            }
            
            const wish = {
                text: wishText,
                date: new Date().toISOString(),
                userId: userId
            };
            
            const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
            wishes.unshift(wish);
            localStorage.setItem('wishes', JSON.stringify(wishes.slice(0, 100)));
            
            wishInput.value = '';
            loadWishes();
            showMessage('祈愿已提交，愿菩萨保佑');
        } else {
            showMessage('请输入祈愿内容');
        }
    }

    // 加载签到数据
    function loadCheckInData() {
        const days = localStorage.getItem('checkInDays') || '0';
        checkInDays.textContent = days;
    }

    // 加载祈愿列表
    function loadWishes() {
        const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
        wishesList.innerHTML = wishes.map(wish => {
            // 确保每个祈愿都有用户标识
            const userId = wish.userId || generateUserId();
            return `
                <div class="wish-item">
                    <div class="wish-header">
                        <span class="wish-user">${userId}</span>
                        <span class="wish-time">${formatDate(wish.date)}</span>
                    </div>
                    <div class="wish-content">${wish.text}</div>
                </div>
            `;
        }).join('');
    }

    // 设置每日佛学小语
    function setDailyWisdom() {
        const today = new Date().toLocaleDateString();
        const index = Math.floor(
            (new Date(today).getTime() / (24 * 60 * 60 * 1000)) % wisdomTexts.length
        );
        dailyWisdom.textContent = wisdomTexts[index];
    }

    // 显示消息提示
    function showMessage(message) {
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
        }, 3000);
    }
}); 