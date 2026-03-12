// 1. Typewriter Effect 
let wordsEN = ["Software Engineer", "Full Stack Developer", "Laravel & .NET Expert"];
let wordsAR = ["مهندس برمجيات", "مطور واجهات متكاملة", "خبير Laravel و .NET"];
let currentWords = wordsEN;
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

const textElement = document.querySelector('.typewriter-text');

function type() {
    if (!textElement) return;
    const currentWord = currentWords[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeTimeout = setTimeout(type, 2000); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % currentWords.length;
        typeTimeout = setTimeout(type, 500);
    } else {
        typeTimeout = setTimeout(type, isDeleting ? 40 : 100);
    }
}
document.addEventListener('DOMContentLoaded', type);

// 2. Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

// 3. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if(icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});

// 4. Language Toggle (Arabic / English)
const langToggleBtn = document.getElementById('lang-toggle');
let isArabic = false;

langToggleBtn.addEventListener('click', () => {
    isArabic = !isArabic;
    document.body.classList.toggle('rtl', isArabic);
    
    // Update button text
    langToggleBtn.innerHTML = isArabic ? '<i class="fas fa-globe"></i> EN' : '<i class="fas fa-globe"></i> AR';

    // Update Typewriter Array
    currentWords = isArabic ? wordsAR : wordsEN;
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    clearTimeout(typeTimeout);
    type(); // Restart typing effect

    // Update all translatable elements
    const translatableElements = document.querySelectorAll('.lang-text');
    translatableElements.forEach(el => {
        if (isArabic) {
            el.innerHTML = el.getAttribute('data-ar');
        } else {
            el.innerHTML = el.getAttribute('data-en');
        }
    });
});

// 5. Active Link on Scroll (Scroll Spy) - الإضافة الجديدة
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinksArr = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // بنخصم 150 بيكسل عشان يحسب القسم بمجرد ما يقرب من فوق شوية بسبب النافبار الثابتة
        if (window.scrollY >= (sectionTop - 150)) { 
            current = section.getAttribute('id');
        }
    });

    navLinksArr.forEach(link => {
        // بنشيل كلاس active من كل اللينكات
        link.classList.remove('active');
        // بنضيف كلاس active للينك اللي بيطابق القسم اللي واقفين عليه دلوقتي
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
