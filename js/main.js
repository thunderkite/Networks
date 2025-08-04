// Main JavaScript functionality

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    initializeTheme();
    initializeNavigation();
    initializeSearch();
    initializeProgressBar();
    initializeTabs();
    initializeModal();
    initializeScrollAnimations();
    initializeBreadcrumbs();
    initializeEquipmentDetails();
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Navigation Management
function initializeNavigation() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sidebar toggle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        
        // Close sidebar when clicking outside on mobile
        if (sidebar.classList.contains('active')) {
            document.addEventListener('click', closeSidebarOnOutsideClick);
        } else {
            document.removeEventListener('click', closeSidebarOnOutsideClick);
        }
    });
    
    function closeSidebarOnOutsideClick(event) {
        if (window.innerWidth <= 1024 && 
            !sidebar.contains(event.target) && 
            !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
            document.removeEventListener('click', closeSidebarOnOutsideClick);
        }
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to target
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
            }
        });
    });
    
    // Update active navigation on scroll
    updateActiveNavigation();
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); // Call once on load
}

// Search Functionality
function initializeSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const searchResults = document.getElementById('searchResults');
    
    // Toggle search
    searchToggle.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });
    
    // Close search
    searchClose.addEventListener('click', function() {
        searchContainer.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    // Search input
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && !searchToggle.contains(e.target)) {
            searchContainer.classList.remove('active');
        }
    });
}

// Perform search
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const sections = document.querySelectorAll('.content-section');
    const results = [];
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title')?.textContent || '';
        const content = section.textContent.toLowerCase();
        const queryLower = query.toLowerCase();
        
        if (content.includes(queryLower)) {
            const id = section.getAttribute('id');
            const excerpt = extractExcerpt(content, queryLower);
            
            results.push({
                id: id,
                title: title,
                excerpt: excerpt
            });
        }
    });
    
    displaySearchResults(results);
}

// Extract search excerpt
function extractExcerpt(content, query) {
    const index = content.indexOf(query);
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 50);
    
    let excerpt = content.substring(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < content.length) excerpt = excerpt + '...';
    
    return excerpt.replace(new RegExp(query, 'gi'), `<mark>$&</mark>`);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--text-muted);">Ничего не найдено</div>';
        return;
    }
    
    const html = results.map(result => `
        <div class="search-result" onclick="navigateToSection('${result.id}')">
            <div style="font-weight: 500; margin-bottom: 4px;">${result.title}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${result.excerpt}</div>
        </div>
    `).join('');
    
    searchResults.innerHTML = html;
}

// Navigate to section from search
function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const searchContainer = document.getElementById('searchContainer');
    
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close search
        searchContainer.classList.remove('active');
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === sectionId) {
                link.classList.add('active');
            }
        });
    }
}

// Progress Bar
function initializeProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    function updateProgressBar() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Call once on load
}

// Tab Management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button, .model-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabType = this.classList.contains('model-tab') ? 'model' : 'tab';
            const targetTab = this.getAttribute('data-tab') || this.getAttribute('data-model');
            
            if (tabType === 'model') {
                // Model tabs
                document.querySelectorAll('.model-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.querySelectorAll('.model-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                this.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-model`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            } else {
                // Equipment tabs
                const parentContainer = this.closest('.equipment-tabs').parentElement;
                
                parentContainer.querySelectorAll('.tab-button').forEach(tab => {
                    tab.classList.remove('active');
                });
                parentContainer.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                this.classList.add('active');
                const targetContent = parentContainer.querySelector(`#${targetTab}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    });
}

// Modal Management
function initializeModal() {
    const modal = document.getElementById('equipmentModal');
    const modalClose = modal.querySelector('.modal-close');
    
    // Close modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                
                // Add stagger animation to children
                const children = entry.target.querySelectorAll('.feature-card, .equipment-card, .timeline-item, .layer');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-slideInFromBottom');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe content sections
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
}

// Breadcrumbs
function initializeBreadcrumbs() {
    const breadcrumbs = document.getElementById('breadcrumbs');
    
    function updateBreadcrumbs() {
        const activeNav = document.querySelector('.nav-link.active');
        if (activeNav) {
            const sectionTitle = activeNav.textContent;
            breadcrumbs.innerHTML = `
                <span class="breadcrumb-item">Главная</span>
                <span style="margin: 0 8px; color: var(--text-muted);">→</span>
                <span class="breadcrumb-item active">${sectionTitle}</span>
            `;
        } else {
            breadcrumbs.innerHTML = '<span class="breadcrumb-item active">Главная</span>';
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateBreadcrumbs);
    
    // Update on navigation click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', updateBreadcrumbs);
    });
    
    updateBreadcrumbs(); // Call once on load
}

// Equipment Details
function initializeEquipmentDetails() {
    const detailButtons = document.querySelectorAll('.details-btn');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const equipmentType = this.getAttribute('data-equipment');
            showEquipmentDetails(equipmentType);
        });
    });
}

// Show equipment details in modal
function showEquipmentDetails(equipmentType) {
    const modal = document.getElementById('equipmentModal');
    const modalBody = document.getElementById('modalBody');
    
    const equipmentDetails = {
        router: {
            title: 'Маршрутизатор (Роутер)',
            icon: '🔄',
            description: 'Сетевое устройство, которое пересылает пакеты данных между различными сегментами сети.',
            features: [
                'Определение оптимального пути для передачи данных',
                'Объединение различных сетей (LAN, WAN)',
                'Функции NAT (Network Address Translation)',
                'Встроенный DHCP-сервер',
                'Беспроводная точка доступа (в домашних роутерах)',
                'Функции безопасности (фаервол)'
            ],
            working: 'Роутер анализирует IP-адрес назначения в каждом пакете и определяет, по какому интерфейсу его отправить, используя таблицу маршрутизации.',
            types: [
                'Домашние роутеры (обычно совмещают функции роутера, свитча и точки доступа)',
                'Корпоративные роутеры (более мощные, с расширенными функциями)',
                'Граничные роутеры (подключение к интернету)',
                'Внутренние роутеры (маршрутизация внутри сети организации)'
            ]
        },
        switch: {
            title: 'Коммутатор (Свитч)',
            icon: '🔀',
            description: 'Сетевое устройство, которое соединяет устройства в локальной сети и передает данные только нужному получателю.',
            features: [
                'Изучение MAC-адресов подключенных устройств',
                'Создание таблицы коммутации',
                'Передача данных только нужному порту',
                'Устранение коллизий',
                'Поддержка полнодуплексного режима',
                'Возможность создания VLAN'
            ],
            working: 'Свитч изучает MAC-адреса устройств, подключенных к каждому порту, и создает таблицу. При получении кадра он смотрит MAC-адрес получателя и отправляет кадр только на нужный порт.',
            types: [
                'Неуправляемые свитчи (Plug & Play)',
                'Управляемые свитчи (с возможностью настройки)',
                'PoE свитчи (питание по Ethernet)',
                'Стекируемые свитчи (объединение в единую систему)'
            ]
        },
        ap: {
            title: 'Точка доступа (Access Point)',
            icon: '📡',
            description: 'Устройство, которое создает беспроводную сеть Wi-Fi и позволяет беспроводным устройствам подключаться к проводной сети.',
            features: [
                'Преобразование проводного сигнала в беспроводной',
                'Поддержка множественных подключений',
                'Различные стандарты Wi-Fi (802.11n, ac, ax)',
                'Функции безопасности (WPA2, WPA3)',
                'Возможность создания нескольких SSID',
                'Управление мощностью передатчика'
            ],
            working: 'Точка доступа получает данные по проводному соединению (обычно Ethernet) и транслирует их по радиоканалу. Также принимает беспроводные сигналы и передает их в проводную сеть.',
            types: [
                'Автономные точки доступа',
                'Контроллерные точки доступа',
                'Mesh точки доступа',
                'Внешние точки доступа'
            ]
        },
        modem: {
            title: 'Модем',
            icon: '📶',
            description: 'Устройство, которое модулирует и демодулирует сигналы для передачи цифровых данных по аналоговым каналам связи.',
            features: [
                'Модуляция цифрового сигнала в аналоговый',
                'Демодуляция аналогового сигнала в цифровой',
                'Различные технологии подключения',
                'Синхронизация с оборудованием провайдера',
                'Диагностические функции',
                'Поддержка различных скоростей'
            ],
            working: 'Модем преобразует цифровые данные компьютера в аналоговые сигналы для передачи по телефонным линиям, кабельным сетям или оптоволокну, и обратно.',
            types: [
                'DSL модемы (для телефонных линий)',
                'Кабельные модемы (для кабельного ТВ)',
                'Оптические модемы (для оптоволокна)',
                'Сотовые модемы (для мобильного интернета)'
            ]
        },
        nic: {
            title: 'Сетевая карта (NIC)',
            icon: '🎯',
            description: 'Аппаратный компонент, который позволяет компьютеру подключаться к сети.',
            features: [
                'Уникальный MAC-адрес',
                'Поддержка различных скоростей (10/100/1000 Мбит/с)',
                'Проводные и беспроводные варианты',
                'Обработка сетевых протоколов',
                'Буферизация данных',
                'Wake-on-LAN функциональность'
            ],
            working: 'Сетевая карта принимает данные от операционной системы, упаковывает их в кадры Ethernet с добавлением MAC-адресов и передает в сеть. Также принимает кадры из сети и передает данные системе.',
            types: [
                'Встроенные сетевые адаптеры',
                'PCI/PCIe сетевые карты',
                'USB сетевые адаптеры',
                'Беспроводные сетевые карты'
            ]
        },
        repeater: {
            title: 'Репитер (Повторитель)',
            icon: '📈',
            description: 'Устройство, которое усиливает и повторяет сетевые сигналы для увеличения дальности передачи.',
            features: [
                'Усиление ослабленных сигналов',
                'Увеличение дальности сети',
                'Работа на физическом уровне',
                'Простота установки',
                'Различные типы для разных сред передачи'
            ],
            working: 'Репитер принимает ослабленный сигнал, усиливает его и передает дальше, восстанавливая первоначальную мощность сигнала.',
            types: [
                'Ethernet репитеры',
                'Wi-Fi репитеры/экстендеры',
                'Оптические репитеры',
                'Радиорепитеры'
            ]
        },
        hub: {
            title: 'Концентратор (Хаб)',
            icon: '🚦',
            description: 'Простейшее сетевое устройство, которое передает входящий сигнал на все порты одновременно (устаревшее).',
            features: [
                'Работа на физическом уровне',
                'Передача сигнала на все порты',
                'Создание единого домена коллизий',
                'Простота конструкции',
                'Низкая стоимость (исторически)'
            ],
            working: 'Хаб просто повторяет электрический сигнал, полученный на одном порту, на все остальные порты без какой-либо обработки.',
            types: [
                'Пассивные хабы (только повторение сигнала)',
                'Активные хабы (с усилением сигнала)',
                'Интеллектуальные хабы (с базовой диагностикой)'
            ],
            note: 'Хабы практически не используются в современных сетях из-за проблем с коллизиями и безопасностью. Заменены коммутаторами.'
        },
        firewall: {
            title: 'Межсетевой экран (Фаервол)',
            icon: '🛡️',
            description: 'Система безопасности, которая контролирует и фильтрует сетевой трафик на основе заданных правил.',
            features: [
                'Фильтрация трафика по IP-адресам и портам',
                'Мониторинг соединений',
                'Защита от вредоносного трафика',
                'Логирование сетевой активности',
                'NAT функциональность',
                'VPN поддержка'
            ],
            working: 'Фаервол анализирует каждый пакет данных согласно настроенным правилам и решает, пропустить его, заблокировать или модифицировать.',
            types: [
                'Программные фаерволы (на ПК/серверах)',
                'Аппаратные фаерволы (отдельные устройства)',
                'Сетевые фаерволы (защита периметра)',
                'Хост-фаерволы (защита конкретного устройства)'
            ]
        },
        converter: {
            title: 'Медиаконвертер',
            icon: '🔄',
            description: 'Устройство, которое преобразует сигналы между различными типами сетевых сред передачи.',
            features: [
                'Преобразование между различными средами',
                'Поддержание качества сигнала',
                'Гальваническая развязка',
                'Индикация состояния линков',
                'Компактный форм-фактор'
            ],
            working: 'Медиаконвертер принимает сигнал в одном формате (например, электрический по витой паре) и преобразует его в другой формат (например, оптический).',
            types: [
                'Ethernet в оптоволокно',
                'Многомодовое в одномодовое оптоволокно',
                'Различные скорости (10/100/1000 Мбит/с)',
                'PoE медиаконвертеры'
            ]
        },
        server: {
            title: 'Серверы',
            icon: '🖥️',
            description: 'Мощные компьютеры, предназначенные для предоставления услуг и ресурсов другим устройствам в сети.',
            features: [
                'Высокая производительность и надежность',
                'Круглосуточная работа',
                'Множественные процессоры и большой объем ОЗУ',
                'Резервирование компонентов',
                'Централизованное управление ресурсами',
                'Масштабируемость'
            ],
            working: 'Серверы обрабатывают запросы от клиентских устройств, предоставляют доступ к данным, приложениям и сервисам.',
            types: [
                'Файловые серверы (хранение и доступ к файлам)',
                'Веб-серверы (обслуживание веб-сайтов)',
                'DNS серверы (разрешение доменных имен)',
                'DHCP серверы (назначение IP-адресов)',
                'Почтовые серверы (обработка электронной почты)',
                'Серверы приложений (выполнение бизнес-логики)'
            ]
        }
    };
    
    const details = equipmentDetails[equipmentType];
    if (!details) return;
    
    const html = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 4rem; margin-bottom: 10px;">${details.icon}</div>
            <h2 style="margin: 0; color: var(--primary-color);">${details.title}</h2>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3>Описание</h3>
            <p>${details.description}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3>Основные функции</h3>
            <ul>
                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3>Принцип работы</h3>
            <p>${details.working}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3>Типы и разновидности</h3>
            <ul>
                ${details.types.map(type => `<li>${type}</li>`).join('')}
            </ul>
        </div>
        
        ${details.note ? `
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 15px; margin-top: 20px;">
                <strong>Примечание:</strong> ${details.note}
            </div>
        ` : ''}
    `;
    
    modalBody.innerHTML = html;
    modal.style.display = 'block';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Скопировано в буфер обмена', 'success');
    }, function() {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Скопировано в буфер обмена', 'success');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        font-size: 14px;
        box-shadow: var(--shadow-lg);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Export functions for use in other modules
window.networkGuide = {
    copyToClipboard,
    showNotification,
    navigateToSection,
    showEquipmentDetails
};