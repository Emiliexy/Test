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
    
    calendarContainer.innerHTML = `
        <div class="calendar-header">
            <h3>佛历</h3>
        </div>
        <div class="calendar-content">
            <div class="calendar-date">
                <span class="year">佛历 ${buddhistYear} 年</span>
                <span class="date">${todayStr}</span>
            </div>
        </div>
    `;

    // 添加到右边栏
    const sidebar = document.querySelector('.sidebar-right');
    if (sidebar) {
        sidebar.appendChild(calendarContainer);
    }
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initBuddhistCalendar); 