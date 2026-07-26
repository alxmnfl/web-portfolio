/* Typing animation in hero section */

const typed = new Typed("#typed", {
    strings: [
        "Front-End Developer",
        "HTML",
        "CSS",
        "JavaScript",
        "Tailwind CSS",
        "Bootstrap",
        "Express.js"
    ],

    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1500,

    loop: true,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|"
});

/* Mobile menu toggle */

const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-nav');
const overlay = document.querySelector('.overlay');

function closeMenu() {
    headerNav.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
}

if (hamburger && headerNav && overlay) {
    hamburger.addEventListener('click', () => {
        headerNav.classList.toggle('open');
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.header-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* Smooth scrolling for nav links */

document.querySelectorAll('.header-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* Skills animation on scroll */

const skillElements = document.querySelectorAll(".skill-tag");

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("visible");
                }, index * 80);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const aboutSection = document.getElementById("about");
if (aboutSection) {
    skillsObserver.observe(aboutSection);
}

/* Active nav link on scroll */

const sections = document.querySelectorAll('section, main');
const navLinks = document.querySelectorAll('.header-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

/* Reveal animations on scroll */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

/* Hero stats counter animation */

const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = el.textContent;
    const hasPlus = target.includes('+');
    const hasPercent = target.includes('%');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

    if (isNaN(numericValue)) return;

    let current = 0;
    const increment = numericValue / 40;
    const duration = 1200;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        let display = Math.floor(current);
        if (hasPlus) display += '+';
        if (hasPercent) display += '%';
        el.textContent = display;
    }, stepTime);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => animateCounter(stat));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('main');
if (heroSection && statNumbers.length > 0) {
    statsObserver.observe(heroSection);
}

/* GitHub stats from API */

async function loadGitHubStats() {
    const username = 'alxmnfl';
    const statsContainer = document.getElementById('githubStats');
    if (!statsContainer) return;

    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        ]);

        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const user = await userRes.json();
        const repos = await reposRes.json();

        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

        const langMap = {};
        repos.forEach(repo => {
            if (repo.language) {
                langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
        });

        const totalLangBytes = Object.values(langMap).reduce((a, b) => a + b, 0);
        const langPercentages = Object.entries(langMap)
            .map(([lang, count]) => ({ lang, percent: Math.round((count / totalLangBytes) * 100) }))
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 5);

        const langColors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#3178c6',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'PHP': '#4F5D95',
            'Python': '#3572A5',
            'MySQL': '#00758F',
            'Java': '#b07219',
            'C': '#555555',
            'C++': '#f34b7d',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Shell': '#89e051',
            'Vue': '#41b883',
            'React': '#61dafb',
            'Tailwind CSS': '#06b6d4',
            'Bootstrap': '#7952b3'
        };

        statsContainer.innerHTML = `
            <div class="github-card">
                <div class="stats-content">
                    <div class="stats-row">
                        <span class="stats-label">Repositories</span>
                        <span class="stats-value">${user.public_repos}</span>
                    </div>
                    <div class="stats-row">
                        <span class="stats-label">Followers</span>
                        <span class="stats-value">${user.followers}</span>
                    </div>
                    <div class="stats-row">
                        <span class="stats-label">Following</span>
                        <span class="stats-value">${user.following}</span>
                    </div>
                    <div class="stats-row">
                        <span class="stats-label">Stars</span>
                        <span class="stats-value">${totalStars}</span>
                    </div>
                    <div class="stats-row">
                        <span class="stats-label">Forks</span>
                        <span class="stats-value">${totalForks}</span>
                    </div>
                </div>
            </div>
            <div class="github-card">
                <div class="stats-content">
                    ${langPercentages.map(({ lang, percent }) => `
                        <div class="lang-item">
                            <div class="lang-dot" style="background: ${langColors[lang] || '#888888'}"></div>
                            <span class="lang-name">${lang}</span>
                            <span class="lang-percent">${percent}%</span>
                        </div>
                        <div class="stats-bar">
                            <div class="stats-bar-fill" style="width: 0%" data-width="${percent}%"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        setTimeout(() => {
            document.querySelectorAll('.stats-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 100);

    } catch (error) {
        statsContainer.innerHTML = `
            <div class="github-card">
                <div class="stats-loading">Unable to load GitHub stats. <a href="https://github.com/${username}" target="_blank" rel="noopener" style="color: var(--primary-color);">View profile</a></div>
            </div>
        `;
    }
}

loadGitHubStats();
