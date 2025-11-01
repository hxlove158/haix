
        // 倒计时逻辑（兼容iOS和Android）
        (function() {
            // 核心修复1：使用全平台兼容的日期格式和解析方法
            const config = {
                targetDate: '2025-10-29', // 用 '-' 分隔，兼容所有设备
                elements: {
                    day: document.getElementById('countdownDays'),
                    hour: document.getElementById('countdownHours'),
                    minute: document.getElementById('countdownMinutes'),
                    second: document.getElementById('countdownSeconds'),
                    totalDay: document.getElementById('h1')
                }
            };

            let timer = null;

            // 核心修复2：手动解析日期（避免不同浏览器解析差异）
            function parseDate(dateStr) {
                const parts = dateStr.split('-');
                // 月份从0开始，手动减1（iOS必须）
                return new Date(parts[0], parts[1] - 1, parts[2]);
            }

            // 计算时间差
            function calculateTimeDiff(targetTime) {
                const nowTime = new Date().getTime();
                const msec = nowTime - targetTime;
                const totalSeconds = Math.floor(msec / 1000);

                // 处理目标日期在未来的情况（避免负数）
                if (totalSeconds < 0) {
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }

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
                    const targetDate = parseDate(config.targetDate);
                    const targetTime = targetDate.getTime();
                    const { days, hours, minutes, seconds } = calculateTimeDiff(targetTime);

                    // 统一更新所有元素
                    if (config.elements.totalDay) config.elements.totalDay.textContent = days;
                    if (config.elements.day) config.elements.day.textContent = formatNumber(days);
                    if (config.elements.hour) config.elements.hour.textContent = formatNumber(hours);
                    if (config.elements.minute) config.elements.minute.textContent = formatNumber(minutes);
                    if (config.elements.second) config.elements.second.textContent = formatNumber(seconds);
                } catch (error) {
                    console.error('更新时器错误:', error);
                    // 错误时重启定时器（应对设备休眠后定时器失效）
                    if (timer) clearInterval(timer);
                    init();
                }
            }

            // 数字格式化
            function formatNumber(num) {
                return num < 10 ? `0${num}` : num;
            }

            // 初始化函数
            function init() {
                updateCountdown(); // 立即执行一次
                // 核心修复3：使用setTimeout递归代替setInterval（避免设备休眠后定时器偏差）
                timer = setTimeout(function updateLoop() {
                    updateCountdown();
                    timer = setTimeout(updateLoop, 1000);
                }, 1000);
            }

            // 核心修复4：确保DOM加载完成后初始化（兼容不同设备的加载时机）
            function safeInit() {
                if (document.readyState === 'complete') {
                    init();
                } else {
                    window.addEventListener('load', init);
                    document.addEventListener('DOMContentLoaded', init);
                }
            }

            // 核心修复5：处理设备休眠/页面隐藏后的数据同步问题
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    // 页面重新显示时立即更新一次
                    updateCountdown();
                }
            });

            // 页面卸载时清理
            window.addEventListener('unload', () => {
                if (timer) clearTimeout(timer);
            });

            // 启动初始化
            safeInit();
        })();

        // 音乐控制逻辑（兼容全平台）
        document.addEventListener('DOMContentLoaded', function() {
            const music = document.getElementById('bgmusic');
            const toggleBtn = document.getElementById('musicToggle');
            let isPlaying = false;

            // 播放/暂停切换
            function togglePlay() {
                if (isPlaying) {
                    music.pause();
                    toggleBtn.innerHTML = '<i class="fa fa-play text-xl"></i>';
                } else {
                    music.play().then(() => {
                        toggleBtn.innerHTML = '<i class="fa fa-pause text-xl"></i>';
                    }).catch(err => {
                        console.log('播放需要用户交互:', err);
                        toggleBtn.innerHTML = '<i class="fa fa-play text-xl"></i>';
                    });
                }
                isPlaying = !isPlaying;
            }

            // 绑定按钮点击（必须用户主动交互才能播放）
            toggleBtn.addEventListener('click', togglePlay);

            // 核心修复：监听首次用户交互（解决iOS/Android自动播放限制）
            function handleFirstInteraction() {
                if (music.paused) {
                    music.play().catch(() => {}); // 尝试播放，失败不处理
                }
                // 移除监听，只触发一次
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
            }

            // 监听点击和触摸事件（覆盖鼠标和触屏设备）
            document.addEventListener('click', handleFirstInteraction, { once: true });
            document.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
