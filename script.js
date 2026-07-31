/* ============================================
   个人网站 - 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== 打字机效果 ===== */
    const typeText = document.getElementById('typeText');
    const phrases = [
        '嵌入式开发',
        '物联网系统设计',
        '传感器与硬件交互',
        '全栈 Web 开发',
        '用代码连接万物'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
            typeText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeLoop, 2000);
                return;
            }
            setTimeout(typeLoop, 100);
        } else {
            typeText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeLoop, 500);
                return;
            }
            setTimeout(typeLoop, 50);
        }
    }
    typeLoop();

    /* ===== 导航栏滚动效果 ===== */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        // 导航栏背景变化
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 高亮当前 section 对应的导航项
        let currentSection = '';
        sections.forEach(function (section) {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });

    /* ===== 移动端菜单 ===== */
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinksEl.classList.toggle('active');
    });

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinksEl.classList.remove('active');
        });
    });

    /* ===== 滚动渐入动画 ===== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 如果是技能条，触发宽度动画
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(function (fill) {
                    fill.style.width = fill.getAttribute('data-width');
                });

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ===== 数字递增动画 ===== */
    const statNums = document.querySelectorAll('.stat-num');
    let statsAnimated = false;

    const statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNums.forEach(function (num) {
                    const target = parseInt(num.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 30;
                    const timer = setInterval(function () {
                        current += increment;
                        if (current >= target) {
                            num.textContent = target;
                            clearInterval(timer);
                        } else {
                            num.textContent = Math.floor(current);
                        }
                    }, 30);
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statNums.length > 0) {
        statObserver.observe(statNums[0].closest('.about-stats'));
    }

    /* ===== 平滑滚动（兼容旧浏览器） ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
