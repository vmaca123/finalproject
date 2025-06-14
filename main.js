window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 60) {
        header.style.background = "url('img/capybara-farm.png') no-repeat center/cover, rgba(255,245,220,0.98)";
        header.style.backgroundBlendMode = 'lighten';
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    } else {
        header.style.background = "url('img/capybara-farm.png') no-repeat center/cover, rgba(255,245,220,0.7)";
        header.style.backgroundBlendMode = 'lighten';
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
    }
});


const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});


const typingTitle = document.getElementById('typing-title');
const typingTexts = [
    'MY PORTFOLIO',
    'Welcome to my page!',
    
];
let typingIdx = 0, charIdx = 0, typingDir = 1;
function typingEffect() {
    if (!typingTitle) return;
    typingTitle.textContent = typingTexts[typingIdx].slice(0, charIdx);
    if (typingDir === 1 && charIdx < typingTexts[typingIdx].length) {
        charIdx++;
    } else if (typingDir === 1) {
        typingDir = -1;
        setTimeout(typingEffect, 1200);
        return;
    } else if (typingDir === -1 && charIdx > 0) {
        charIdx--;
    } else {
        typingDir = 1;
        typingIdx = (typingIdx + 1) % typingTexts.length;
    }
    setTimeout(typingEffect, typingDir === 1 ? 90 : 40);
}
typingEffect();


const fadeSections = document.querySelectorAll('.section-fade');
function handleFadeIn() {
    fadeSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            sec.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('DOMContentLoaded', handleFadeIn);


const teamMembers = document.querySelectorAll('.team-member');
const popup = document.getElementById('profilePopup');
const popupContent = document.getElementById('popupContent');
const closePopup = document.getElementById('closePopup');
teamMembers.forEach(member => {
    member.addEventListener('click', () => {
        const name = member.dataset.name;
        const info = member.dataset.info;
        popupContent.innerHTML = `<h3 style='margin-bottom:10px;'>${name}</h3><p>${info}</p>`;
        popup.classList.add('active');
    });
});
closePopup.addEventListener('click', () => popup.classList.remove('active'));
popup.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('active'); });


const counter = document.getElementById('visitor-counter');
if (counter) {
    let visits = localStorage.getItem('visit-count') || 0;
    visits++;
    localStorage.setItem('visit-count', visits);
    counter.textContent = `이 페이지에 방문한 횟수: ${visits}회`;
    counter.style.display = 'block';
}


const greetings = [
    '오늘도 멋진 하루 보내세요! 😊',
    '코딩은 즐거움입니다!',
    '함께 성장하는 개발자, 파이팅!',
    '작은 변화가 큰 성장을 만듭니다.',
    '웹 개발의 세계에 오신 것을 환영합니다!'
];
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const greetDiv = document.createElement('div');
    greetDiv.textContent = greetings[Math.floor(Math.random() * greetings.length)];
    greetDiv.style.fontSize = '1.1rem';
    greetDiv.style.color = '#bfa77a';
    greetDiv.style.marginBottom = '10px';
    greetDiv.style.fontWeight = 'bold';
    aboutSection.insertBefore(greetDiv, aboutSection.firstChild);
}

// 1. 실시간 시간/날짜 위젯
const datetimeWidget = document.getElementById('datetime-widget');
function updateDateTime() {
    if (!datetimeWidget) return;
    const now = new Date();
    const week = ['일','월','화','수','목','금','토'];
    const y = now.getFullYear();
    const m = String(now.getMonth()+1).padStart(2,'0');
    const d = String(now.getDate()).padStart(2,'0');
    const h = String(now.getHours()).padStart(2,'0');
    const min = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    datetimeWidget.textContent = `${y}.${m}.${d} (${week[now.getDay()]}) ${h}:${min}:${s}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// 4. 클릭 점수 미니게임
const scoreBtn = document.getElementById('score-btn');
const scoreView = document.getElementById('score-view');
let score = Number(localStorage.getItem('mini-game-score') || 0);
function updateScoreView() {
    if(scoreView) scoreView.textContent = `점수: ${score}`;
}
updateScoreView();
if(scoreBtn) {
    scoreBtn.addEventListener('click', () => {
        score++;
        localStorage.setItem('mini-game-score', score);
        updateScoreView();
        scoreBtn.style.transform = 'scale(1.12)';
        setTimeout(()=>{scoreBtn.style.transform='';}, 120);
    });
}
