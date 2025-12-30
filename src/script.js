document.addEventListener('DOMContentLoaded', () => {
    const typedName = document.getElementById('typedName');
    const typedJobTitle = document.getElementById('typedJobTitle');
    const typedPhrase = document.getElementById('typedPhrase');
    const avatar = document.getElementById('avatar');
    const navLinks = document.querySelectorAll('.navbar .nav-links a');
    const scrollProgress = document.getElementById('scrollProgress');
    const themeToggleBtn = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const sections = document.querySelectorAll('section');
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const currentCharCount = document.getElementById('currentCharCount');
    const messageBox = document.getElementById('messageBox');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const currentYearSpan = document.getElementById('currentYear');

    const nameText = "Reem S. Alsersawi";
    const jobTitleText = "مطورة واجهات أمامية";
    const phraseText = "متحمسة لبناء تجارب ويب جذابة ومبتكرة.";

    currentYearSpan.textContent = new Date().getFullYear();

    function typeWriter(element, text, delay = 100, callback = () => { }) {
        let i = 0;
        element.innerHTML = '';
        element.style.animation = 'none';
        element.offsetWidth;
        element.style.animation = null;

        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                callback();
            }
        }, delay);
    }

    function startTypingSequence() {
        typeWriter(typedName, nameText, 80, () => {
            typedName.style.borderRight = 'none';
            typeWriter(typedJobTitle, jobTitleText, 70, () => {
                typedJobTitle.style.borderRight = 'none';
                typeWriter(typedPhrase, phraseText, 50, () => {
                    typedPhrase.style.borderRight = 'none';
                });
            });
        });
    }

    startTypingSequence();

    avatar.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = avatar.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        const rotY = (deltaX / width) * 10;
        const rotX = -(deltaY / height) * 10;

        const moveX = (deltaX / width) * 5;
        const moveY = (deltaY / height) * 5;

        avatar.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate(${moveX}px, ${moveY}px)`;
    });

    avatar.addEventListener('mouseleave', () => {
        avatar.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)';
    });

    function updateNavbarAndProgress() {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const id = section.getAttribute('id');

            navLinks.forEach(link => {
                if (link.getAttribute('data-section') === id) {
                    if (scrollY >= sectionTop && scrollY < sectionBottom) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        });


        if (scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', updateNavbarAndProgress);
    window.addEventListener('resize', updateNavbarAndProgress);
    updateNavbarAndProgress();

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        document.body.classList.remove('dark-theme');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

            } else {

            }
        });
    }, observerOptions);


    sections.forEach(section => {
        if (section.id !== 'header') {
            sectionObserver.observe(section);
        }
    });


    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = `${progress}%`;
                });
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });
    skillsObserver.observe(skillsSection);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateInput(input, errorElement, errorMessage, regex = null) {
        let isValid = true;
        if (input.value.trim() === '') {
            errorElement.textContent = errorMessage;
            input.parentElement.classList.add('has-error');
            isValid = false;
        } else if (regex && !regex.test(input.value)) {
            errorElement.textContent = 'صيغة غير صحيحة.';
            input.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            input.parentElement.classList.remove('has-error');
        }
        return isValid;
    }

    function updateCharCounter() {
        const currentLength = messageTextarea.value.length;
        const maxLength = messageTextarea.getAttribute('maxlength');
        currentCharCount.textContent = currentLength;
        if (currentLength > maxLength) {
            currentCharCount.style.color = '#dc3545';
        } else {
            currentCharCount.style.color = '';
        }
    }

    function saveDraft() {
        const draft = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageTextarea.value
        };
        localStorage.setItem('contactFormDraft', JSON.stringify(draft));
    }

    function loadDraft() {
        const draft = localStorage.getItem('contactFormDraft');
        if (draft) {
            const parsedDraft = JSON.parse(draft);
            nameInput.value = parsedDraft.name || '';
            emailInput.value = parsedDraft.email || '';
            messageTextarea.value = parsedDraft.message || '';
            updateCharCounter();
        }
    }

    nameInput.addEventListener('input', () => validateInput(nameInput, nameError, 'الاسم مطلوب.'));
    emailInput.addEventListener('input', () => validateInput(emailInput, emailError, 'البريد الإلكتروني مطلوب وصيغته غير صحيحة.', emailRegex));
    messageTextarea.addEventListener('input', () => {
        validateInput(messageTextarea, messageError, 'الرسالة مطلوبة.');
        updateCharCounter();
    });

    nameInput.addEventListener('input', saveDraft);
    emailInput.addEventListener('input', saveDraft);
    messageTextarea.addEventListener('input', saveDraft);

    loadDraft();

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateInput(nameInput, nameError, 'الاسم مطلوب.');
        const isEmailValid = validateInput(emailInput, emailError, 'البريد الإلكتروني مطلوب وصيغته غير صحيحة.', emailRegex);
        const isMessageValid = validateInput(messageTextarea, messageError, 'الرسالة مطلوبة.');

        if (isNameValid && isEmailValid && isMessageValid) {

            console.log('Form Submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageTextarea.value
            });

            messageBox.textContent = 'تم إرسال رسالتك بنجاح! شكراً لك.';
            messageBox.style.backgroundColor = '#d4edda';
            messageBox.style.color = '#155724';
            messageBox.style.borderColor = '#c3e6cb';
            messageBox.style.display = 'block';

            contactForm.reset();
            localStorage.removeItem('contactFormDraft');
            updateCharCounter();

            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 5000);
        } else {
            messageBox.textContent = 'الرجاء تصحيح الأخطاء في النموذج.';
            messageBox.style.backgroundColor = '#f8d7da';
            messageBox.style.color = '#721c24';
            messageBox.style.borderColor = '#f5c6cb';
            messageBox.style.display = 'block';
        }
    });
});
