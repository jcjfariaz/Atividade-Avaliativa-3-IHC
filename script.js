document.addEventListener('DOMContentLoaded', () => {
        const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }

                let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

        const menuItems = document.querySelectorAll('.menu-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');

                        menuItems.forEach(i => i.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

                        item.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });

        const modal = document.getElementById('loginModal');
    const btnOpen = document.getElementById('openLogin');
    const btnClose = document.querySelector('.close');

    if (btnOpen && modal) {
        btnOpen.onclick = () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    if (btnClose && modal) {
        btnClose.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    window.onclick = (event) => {
        if (modal && event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

        const searchInput = document.querySelector('.search-bar input');
    const doctorCards = document.querySelectorAll('.doctor-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            doctorCards.forEach(card => {
                const name = card.querySelector('h4').textContent.toLowerCase();
                const spec = card.querySelector('span').textContent.toLowerCase();
                
                if (name.includes(term) || spec.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

        const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');
    const scheduledList = document.getElementById('scheduledList');
    const emptyState = document.getElementById('emptyState');

    if (appointmentDate) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        appointmentDate.min = `${yyyy}-${mm}-${dd}`;
        appointmentDate.value = `${yyyy}-${mm}-${dd}`;
    }

    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const docCard = btn.parentElement;
            const docName = docCard.querySelector('h4').textContent;
            const docSpec = docCard.querySelector('span').textContent;
            const dateValue = appointmentDate ? appointmentDate.value : '';
            const timeValue = appointmentTime ? appointmentTime.value : '';

            if (!dateValue || !timeValue) {
                alert('Escolha data e hora antes de agendar.');
                return;
            }

            const formattedDate = new Date(`${dateValue}T${timeValue}`);
            const day = String(formattedDate.getDate()).padStart(2, '0');
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const year = formattedDate.getFullYear();
            const hour = String(formattedDate.getHours()).padStart(2, '0');
            const minute = String(formattedDate.getMinutes()).padStart(2, '0');
            const dateLabel = `${day}/${month}/${year} - ${hour}:${minute}`;

            alert(`Consulta agendada com ${docName} em ${dateLabel}.`);

            if (scheduledList && emptyState) {
                emptyState.style.display = 'none';
                const card = document.createElement('div');
                card.className = 'appointment-card';
                card.innerHTML = `
                    <h4>${docName}</h4>
                    <span>${docSpec}</span>
                    <p>${dateLabel}</p>
                    <p>Status: <strong>Confirmada</strong></p>
                `;
                scheduledList.prepend(card);
            }
        });
    });

        const loginForm = document.getElementById('loginForm');
    const loginSuccessMsg = document.getElementById('loginSuccessMsg');
    const loginSuccessText = document.querySelector('.login-success-text');
    const loginSuccessOk = document.getElementById('loginSuccessOk');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (loginSuccessMsg && loginSuccessText) {
                loginSuccessText.textContent = 'Login realizado com sucesso!';
                loginSuccessMsg.style.display = 'grid';
            }
        });
    }

    if (loginSuccessOk) {
        loginSuccessOk.addEventListener('click', () => {
            if (modal) {
                modal.style.display = 'none';
            }
            document.body.style.overflow = 'auto';
            if (loginSuccessMsg) {
                loginSuccessMsg.style.display = 'none';
            }
            if (loginForm) {
                loginForm.reset();
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    const signupSuccessMsg = document.getElementById('signupSuccessMsg');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const phone = document.getElementById('signupPhone').value.trim();
            const birth = document.getElementById('signupBirth').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupPasswordConfirm').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem.');
                return;
            }

            const userData = {
                name,
                email,
                phone,
                birth,
                password
            };

            localStorage.setItem('clinicauxUser', JSON.stringify(userData));

            if (signupSuccessMsg) {
                signupSuccessMsg.style.display = 'grid';
            }

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        });
    }

        const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const navLinksList = document.querySelector('.nav-links');
            if (navLinksList.style.display === 'flex') {
                navLinksList.style.display = 'none';
            } else {
                navLinksList.style.display = 'flex';
                navLinksList.style.flexDirection = 'column';
                navLinksList.style.position = 'absolute';
                navLinksList.style.top = '100%';
                navLinksList.style.left = '0';
                navLinksList.style.width = '100%';
                navLinksList.style.background = 'white';
                navLinksList.style.padding = '20px';
                navLinksList.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }
});