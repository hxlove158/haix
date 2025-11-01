 // 倒计时逻辑
        (function() {
            // 配置参数集中管理
            const config = {
                targetDate: '2025,10,29', // 目标日期
                elements: {
                    day: document.getElementById('countdownDays'),
                    hour: document.getElementById('countdownHours'),
                    minute: document.getElementById('countdownMinutes'),
                    second: document.getElementById('countdownSeconds'),
                    totalDay: document.getElementById('h1')
                }
            };

            let timer = null;

            // 计算时间差的核心函数
            function calculateTimeDiff(targetTime) {
                const nowTime = new Date().getTime();
                const msec = nowTime - targetTime;
                const totalSeconds = Math.floor(msec / 1000);

                return {
                    days: Math.floor(totalSeconds / 86400),
                    hours: Math.floor((totalSeconds % 86400) / 3600),
                    minutes: Math.floor((totalSeconds % 3600) / 60),
                    seconds: totalSeconds % 60
                };
            }

            // 更新DOM显示
            function updateCountdown() {
                try {
                    const targetTime = new Date(config.targetDate).getTime();
                    const { days, hours, minutes, seconds } = calculateTimeDiff(targetTime);

                    // 统一更新所有元素
                    if (config.elements.totalDay) config.elements.totalDay.textContent = days;
                    if (config.elements.day) config.elements.day.textContent = formatNumber(days);
                    if (config.elements.hour) config.elements.hour.textContent = formatNumber(hours);
                    if (config.elements.minute) config.elements.minute.textContent = formatNumber(minutes);
                    if (config.elements.second) config.elements.second.textContent = formatNumber(seconds);
                } catch (error) {
                    console.error('更新倒计时失败:', error);
                }
            }

            // 数字格式化（确保两位数显示）
            function formatNumber(num) {
                return num < 10 ? `0${num}` : num;
            }

            // 初始化函数
            function init() {
                updateCountdown(); // 立即执行一次
                timer = setInterval(updateCountdown, 1000);
            }

            // 页面加载完成后初始化
            if (document.readyState === 'complete') {
                init();
            } else {
                window.addEventListener('load', init);
            }

            // 页面卸载时清理定时器
            window.addEventListener('unload', () => {
                if (timer) clearInterval(timer);
            });
        })();

        // 音乐控制逻辑
        document.addEventListener('DOMContentLoaded', function() {
            const music = document.getElementById('bgmusic');
            const toggleBtn = document.getElementById('musicToggle');
            let isPlaying = false;

            // 尝试播放音乐（处理浏览器自动播放限制）
            function tryPlayMusic() {
                if (music.paused) {
                    music.play().then(() => {
                        isPlaying = true;
                        toggleBtn.innerHTML = '<i class="fa fa-pause text-xl"></i>';
                    }).catch(err => {
                        console.log('需要用户交互才能播放音乐:', err);
                        toggleBtn.innerHTML = '<i class="fa fa-play text-xl"></i>';
                    });
                }
            }

            // 音乐按钮点击事件
            toggleBtn.addEventListener('click', function() {
                if (isPlaying) {
                    music.pause();
                    toggleBtn.innerHTML = '<i class="fa fa-play text-xl"></i>';
                } else {
                    tryPlayMusic();
                }
                isPlaying = !isPlaying;
            });

            // 监听用户交互以触发播放（解决自动播放限制）
            ['click', 'touchstart', 'keydown'].forEach(event => {
                document.addEventListener(event, tryPlayMusic, { once: true });
            });
        });