// 佛教节日数据
const BUDDHIST_FESTIVALS = [
    {
        name: '观音菩萨圣诞',
        lunarDate: '二月十九',
        solarDate: '2025-03-18',
        description: '农历二月十九日是观世音菩萨圣诞。这一天，信徒们会前往寺庙礼佛、诵经、放生。',
        customs: ['诵《普门品》', '放生', '供灯'],
        sutras: ['《妙法莲华经·观世音菩萨普门品》', '《大悲咒》']
    },
    {
        name: '释迦牟尼佛圣诞',
        lunarDate: '四月初八',
        solarDate: '2025-05-05',
        description: '农历四月初八是释迦牟尼佛诞辰日，又称卫塞节、浴佛节。',
        customs: ['浴佛', '诵经', '放生'],
        sutras: ['《浴佛功德经》']
    }
];

function getBuddhistYear() {
    const currentYear = new Date().getFullYear();
    return currentYear + 543; // 佛历比公历多543年
}

function initBuddhistCalendar() {
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'buddhist-calendar';
    
    const buddhistYear = getBuddhistYear();
    const today = new Date();
    const options = { month: 'long', day: 'numeric' };
    const todayStr = today.toLocaleDateString('zh-CN', options);
    
    // 查找最近的佛教节日
    const upcomingFestival = findUpcomingFestival();
    
    calendarContainer.innerHTML = `
        <div class="calendar-header">
            <h3>佛历</h3>
        </div>
        <div class="calendar-content">
            <div class="calendar-date">
                <span class="year">佛历 ${buddhistYear} 年</span>
                <span class="date">${todayStr}</span>
            </div>
            ${upcomingFestival ? `
                <div class="upcoming-festival">
                    <div class="festival-icon">🙏</div>
                    <div class="festival-info">
                        <span class="festival-name">${upcomingFestival.name}</span>
                        <span class="festival-date">农历${upcomingFestival.lunarDate}</span>
                        <span class="festival-solar-date">${formatDate(upcomingFestival.solarDate)}</span>
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    // 添加到右边栏
    const sidebar = document.querySelector('.sidebar-right');
    if (sidebar) {
        sidebar.insertBefore(calendarContainer, sidebar.firstChild);
    }

    // 添加点击事件显示节日详情
    if (upcomingFestival) {
        const festivalElement = calendarContainer.querySelector('.upcoming-festival');
        festivalElement.addEventListener('click', () => {
            showFestivalDetails(upcomingFestival);
        });
    }
}

function findUpcomingFestival() {
    const today = new Date();
    const upcoming = BUDDHIST_FESTIVALS.find(festival => {
        const festivalDate = new Date(festival.solarDate);
        return festivalDate >= today;
    });
    return upcoming;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
        month: 'long',
        day: 'numeric'
    });
}

function showFestivalDetails(festival) {
    const modal = document.createElement('div');
    modal.className = 'festival-modal';
    modal.innerHTML = `
        <div class="festival-modal-content">
            <h3>${festival.name}</h3>
            <div class="festival-dates">
                <p>农历：${festival.lunarDate}</p>
                <p>公历：${formatDate(festival.solarDate)}</p>
            </div>
            <p class="festival-description">${festival.description}</p>
            <div class="festival-customs">
                <h4>传统习俗</h4>
                <ul>
                    ${festival.customs.map(custom => `<li>${custom}</li>`).join('')}
                </ul>
            </div>
            <div class="festival-sutras">
                <h4>推荐经典</h4>
                <ul>
                    ${festival.sutras.map(sutra => `<li>${sutra}</li>`).join('')}
                </ul>
            </div>
            <button class="close-modal">关闭</button>
        </div>
    `;

    document.body.appendChild(modal);

    // 添加关闭事件
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initBuddhistCalendar); 