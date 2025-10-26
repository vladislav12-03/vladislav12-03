// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		navMenu.classList.toggle('active');
	});
	// Закрытие меню при клике на ссылку
	document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
		hamburger.classList.remove('active');
		navMenu.classList.remove('active');
	}));
}

// Плавная прокрутка по якорям
if (document.querySelector('a[href^="#"]')) {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});
}

// Модальное окно контактов
function setupContactModal(){
	const triggers = document.querySelectorAll('.contact-trigger');
	const modal = document.getElementById('contactModal');
	if (!modal || triggers.length === 0) return;
	const closeBtn = modal.querySelector('[data-close]');
	const close = () => modal.classList.remove('show');
	triggers.forEach(t => t.addEventListener('click', (e)=>{ e.preventDefault(); modal.classList.add('show'); }));
	closeBtn && closeBtn.addEventListener('click', close);
	modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });
	document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
}
setupContactModal();

// Остальные эффекты (оставляем, если элементы есть на странице)
function safeQuery(sel){ return document.querySelector(sel); }

// Анимации появления секций
const animatedSections = document.querySelectorAll('section');
if (animatedSections.length){
	const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);
	animatedSections.forEach(section => {
		section.style.opacity = '0';
		section.style.transform = 'translateY(30px)';
		section.style.transition = 'all 0.8s ease-out';
		observer.observe(section);
	});
}

// Терминал и прочие анимации запускаем, только если есть соответствующие элементы
(function animateOptional(){
	const terminal = safeQuery('.terminal-window');
	if (terminal){
		terminal.style.opacity = '0';
		terminal.style.transform = 'scale(0.9)';
		setTimeout(()=>{
			terminal.style.transition = 'all 0.8s ease-out';
			terminal.style.opacity = '1';
			terminal.style.transform = 'scale(1)';
		}, 500);
	}
	const avatar = safeQuery('.main-avatar');
	if (avatar){
		avatar.addEventListener('mouseenter', () => { avatar.style.boxShadow = '0 0 40px var(--shadow-color)'; });
		avatar.addEventListener('mouseleave', () => { avatar.style.boxShadow = '0 0 30px var(--shadow-color)'; });
	}
})();

// Анимация для статистики
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        if (target) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('∞') ? '∞' : '');
            }, 50);
        }
    });
}

// Запуск анимации статистики при появлении секции "Обо мне"
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    aboutObserver.observe(aboutSection);
}

// Анимация терминала
function animateTerminal() {
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        terminal.style.opacity = '0';
        terminal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            terminal.style.transition = 'all 0.8s ease-out';
            terminal.style.opacity = '1';
            terminal.style.transform = 'scale(1)';
        }, 500);
    }
}

// Запуск анимации терминала
setTimeout(animateTerminal, 1000);

// Эффект параллакса для фона
// Отключаем попытку искать псевдо-элемент ::before (его нельзя выбрать через querySelector)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallax = document.querySelector('.hero::before');
//     if (parallax) {
//         const speed = scrolled * 0.5;
//         parallax.style.transform = `translateY(${speed}px)`;
//     }
// });

// Анимация для тегов
function animateTags() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Запуск анимации тегов
setTimeout(animateTags, 1500);

// Анимация для кнопок
function animateButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            button.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 100);
        }, index * 300);
    });
}

// Запуск анимации кнопок
setTimeout(animateButtons, 2000);

// Анимация для иконок техники
function animateTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon i');
    techIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.transform = 'scale(0)';
            icon.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 100);
        }, index * 200);
    });
}

// Запуск анимации иконок техники при появлении секции
const techSection = document.querySelector('.tech');
if (techSection) {
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTechIcons();
                techObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    techObserver.observe(techSection);
}

// Анимация для проектов
function animateProjects() {
    const projects = document.querySelectorAll('.project-item');
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(30px)';
            project.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        }, index * 300);
    });
}

// Запуск анимации проектов
const projectsSection = document.querySelector('.projects');
if (projectsSection) {
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjects();
                projectsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    projectsObserver.observe(projectsSection);
}

// Анимация для кота
function animateCat() {
    const catPhoto = document.querySelector('.cat-photo');
    const catInfo = document.querySelector('.cat-info');
    
    if (catPhoto && catInfo) {
        catPhoto.style.opacity = '0';
        catPhoto.style.transform = 'translateX(-30px)';
        catPhoto.style.transition = 'all 0.8s ease-out';
        
        catInfo.style.opacity = '0';
        catInfo.style.transform = 'translateX(30px)';
        catInfo.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            catPhoto.style.opacity = '1';
            catPhoto.style.transform = 'translateX(0)';
        }, 200);
        
        setTimeout(() => {
            catInfo.style.opacity = '1';
            catInfo.style.transform = 'translateX(0)';
        }, 400);
    }
}

// Запуск анимации кота
const catSection = document.querySelector('.cat');
if (catSection) {
    const catObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCat();
                catObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    catObserver.observe(catSection);
}

// Анимация для стиля жизни
function animateLifestyle() {
    const lifestyleItems = document.querySelectorAll('.lifestyle-item');
    lifestyleItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Запуск анимации стиля жизни
const lifestyleSection = document.querySelector('.lifestyle');
if (lifestyleSection) {
    const lifestyleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLifestyle();
                lifestyleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    lifestyleObserver.observe(lifestyleSection);
}

// Анимация для контактов
function animateContacts() {
    const contactItems = document.querySelectorAll('.contact-item');
    const socialLinks = document.querySelectorAll('.social-link');
    
    contactItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
    
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            link.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100);
        }, (index * 200) + 600);
    });
}

// Запуск анимации контактов
const contactSection = document.querySelector('.contact');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContacts();
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    contactObserver.observe(contactSection);
}

// Эффект печатания для терминала
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Анимация печатания для терминала
setTimeout(() => {
    const commandElement = document.querySelector('.command');
    if (commandElement) {
        typeWriter(commandElement, 'whoami', 150);
    }
}, 2500);

// Анимация для подвала
function animateFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
        footer.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Запуск анимации подвала
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateFooter();
            footerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

footerObserver.observe(document.querySelector('.footer'));

// Эффект параллакса для навигации
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Анимация для заголовков секций
function animateSectionTitles() {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((title, index) => {
        setTimeout(() => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(-20px)';
            title.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Запуск анимации заголовков при загрузке страницы
window.addEventListener('load', () => {
    setTimeout(animateSectionTitles, 500);
});

// Эффект hover для карточек
document.querySelectorAll('.tech-item, .project-item, .lifestyle-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Анимация для тегов в секции "Обо мне"
function animateAboutTags() {
    const tags = document.querySelectorAll('.hero-tags .tag');
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            tag.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, 100);
        }, index * 150);
    });
}

// Запуск анимации тегов
setTimeout(animateAboutTags, 1800);

// Эффект свечения для основного цвета
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px var(--shadow-color)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 25px var(--shadow-color)';
    });
});

// Анимация для статистики при hover
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px var(--shadow-color)';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
        this.style.boxShadow = '0 10px 25px var(--shadow-color)';
    });
});

// Плавная анимация для всех элементов
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем класс для плавных переходов
    document.body.classList.add('loaded');
    
    // Анимация появления страницы
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Инициализация всех анимаций
window.addEventListener('load', () => {
    // Небольшая задержка для плавности
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
}); 

// Вычисление возраста кота
(function setCatAge(){
    const ageEl = document.getElementById('cat-age');
    if (!ageEl) return;
    const attr = ageEl.getAttribute('data-birth');
    const birth = attr ? new Date(attr) : new Date(2018, 9, 20);
    const now = new Date();
    if (isNaN(birth.getTime())) { ageEl.textContent = '—'; return; }
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
        years -= 1;
        months += 12;
    }
    const y = years;
    const m = months;
    function plural(n, forms){
        const n10 = n % 10, n100 = n % 100;
        if (n10 === 1 && n100 !== 11) return forms[0];
        if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
        return forms[2];
    }
    let text = `${y} ${plural(y, ['год','года','лет'])}`;
    if (m > 0) { text += ` ${m} ${plural(m, ['месяц','месяца','месяцев'])}`; }
    ageEl.textContent = text;
})(); 