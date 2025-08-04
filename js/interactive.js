// Interactive Elements JavaScript

// Initialize interactive elements
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    initializeOSIInteractivity();
    initializeNetworkDiagrams();
    initializeSubnetCalculator();
    initializeDNSDemo();
    initializeARPDemo();
    initializeEthernetFrame();
    initializeWiFiFrequencies();
    initializeInteractiveTerminal();
    initializeCopyButtons();
}

// OSI Model Interactivity
function initializeOSIInteractivity() {
    const layers = document.querySelectorAll('.layer');
    
    layers.forEach((layer, index) => {
        layer.addEventListener('click', function() {
            showLayerDetail(7 - index); // Reverse order since layers are displayed 7-1
        });
    });
}

// Show detailed layer information
function showLayerDetail(layerNumber) {
    const layerInfo = {
        7: {
            name: "Прикладной уровень (Application Layer)",
            description: "Предоставляет интерфейс между приложениями и сетью",
            protocols: ["HTTP/HTTPS", "FTP", "SMTP", "POP3", "IMAP", "DNS", "DHCP", "SSH", "Telnet"],
            example: "Когда вы открываете веб-страницу в браузере, HTTP протокол работает на этом уровне",
            data: "Данные приложения"
        },
        6: {
            name: "Уровень представления (Presentation Layer)",
            description: "Обеспечивает кодирование, шифрование и сжатие данных",
            protocols: ["SSL/TLS", "JPEG", "GIF", "PNG", "MPEG", "ASCII", "EBCDIC"],
            example: "Когда сайт использует HTTPS, SSL/TLS шифрует данные на этом уровне",
            data: "Зашифрованные/сжатые данные"
        },
        5: {
            name: "Сеансовый уровень (Session Layer)",
            description: "Управляет установлением, поддержанием и завершением сеансов",
            protocols: ["NetBIOS", "RPC", "SQL", "NFS", "SMB"],
            example: "Когда вы входите на сайт, создается сессия между браузером и сервером",
            data: "Данные сеанса"
        },
        4: {
            name: "Транспортный уровень (Transport Layer)",
            description: "Обеспечивает надежную или быструю доставку данных",
            protocols: ["TCP", "UDP", "SCTP"],
            example: "TCP гарантирует доставку всех частей файла при скачивании",
            data: "Сегменты"
        },
        3: {
            name: "Сетевой уровень (Network Layer)",
            description: "Отвечает за маршрутизацию пакетов между сетями",
            protocols: ["IP (IPv4/IPv6)", "ICMP", "ARP", "OSPF", "BGP"],
            example: "IP-адрес определяет путь данных через интернет",
            data: "Пакеты"
        },
        2: {
            name: "Канальный уровень (Data Link Layer)",
            description: "Обеспечивает передачу данных в рамках одной сети",
            protocols: ["Ethernet", "Wi-Fi (802.11)", "PPP", "Frame Relay"],
            example: "Ethernet кадры передают данные по локальной сети",
            data: "Кадры (Frames)"
        },
        1: {
            name: "Физический уровень (Physical Layer)",
            description: "Передача битов по физической среде",
            protocols: ["Витая пара", "Оптоволокно", "Радиоволны", "Коаксиальный кабель"],
            example: "Электрические сигналы по проводам или радиоволны по воздуху",
            data: "Биты (0 и 1)"
        }
    };
    
    const info = layerInfo[layerNumber];
    if (!info) return;
    
    const modal = document.getElementById('equipmentModal');
    const modalBody = document.getElementById('modalBody');
    
    const html = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 3rem; margin-bottom: 10px;">${layerNumber}</div>
            <h2 style="margin: 0; color: var(--primary-color);">${info.name}</h2>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3>Описание</h3>
            <p>${info.description}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3>Протоколы и технологии</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${info.protocols.map(protocol => `
                    <span style="background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                        ${protocol}
                    </span>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3>Пример работы</h3>
            <p style="background: var(--surface-color); padding: 15px; border-radius: 8px; border-left: 3px solid var(--primary-color);">
                ${info.example}
            </p>
        </div>
        
        <div style="background: var(--surface-color); padding: 15px; border-radius: 8px;">
            <strong>Тип данных:</strong> ${info.data}
        </div>
    `;
    
    modalBody.innerHTML = html;
    modal.style.display = 'block';
}

// Network Diagrams Interactivity
function initializeNetworkDiagrams() {
    // Make network devices clickable
    const devices = document.querySelectorAll('.device');
    
    devices.forEach(device => {
        device.addEventListener('click', function() {
            const deviceType = this.textContent.trim();
            showDeviceInfo(deviceType);
        });
        
        device.style.cursor = 'pointer';
        device.title = 'Нажмите для получения информации';
    });
}

// Show device information
function showDeviceInfo(deviceEmoji) {
    const deviceInfo = {
        '💻': {
            name: 'Компьютер/Ноутбук',
            description: 'Рабочая станция пользователя',
            functions: ['Обработка данных', 'Запуск приложений', 'Подключение к сети'],
            ip: '192.168.1.100',
            mac: '00:1A:2B:3C:4D:5E'
        },
        '📡': {
            name: 'Роутер/Точка доступа',
            description: 'Устройство для маршрутизации и создания Wi-Fi сети',
            functions: ['Маршрутизация', 'DHCP', 'NAT', 'Wi-Fi точка доступа'],
            ip: '192.168.1.1',
            mac: '00:AA:BB:CC:DD:EE'
        },
        '🖥️': {
            name: 'Сервер',
            description: 'Сервер для хранения данных и предоставления сервисов',
            functions: ['Файловый сервер', 'Веб-сервер', 'DNS сервер', 'DHCP сервер'],
            ip: '192.168.1.10',
            mac: '00:11:22:33:44:55'
        },
        '📱': {
            name: 'Мобильное устройство',
            description: 'Смартфон или планшет',
            functions: ['Мобильные приложения', 'Беспроводное подключение', 'Мультимедиа'],
            ip: '192.168.1.150',
            mac: '00:AA:11:BB:22:CC'
        },
        '🖨️': {
            name: 'Принтер',
            description: 'Сетевой принтер',
            functions: ['Печать документов', 'Сканирование', 'Общий доступ'],
            ip: '192.168.1.200',
            mac: '00:DD:EE:FF:AA:BB'
        },
        '🔀': {
            name: 'Коммутатор (Switch)',
            description: 'Устройство для объединения устройств в локальной сети',
            functions: ['Коммутация кадров', 'Изучение MAC-адресов', 'VLAN поддержка'],
            ip: '192.168.1.2',
            mac: '00:CC:DD:EE:FF:AA'
        }
    };
    
    const info = deviceInfo[deviceEmoji];
    if (!info) return;
    
    window.networkGuide.showNotification(
        `${info.name}: ${info.description}`,
        'info'
    );
}

// Subnet Calculator
function initializeSubnetCalculator() {
    // Create subnet calculator if it doesn't exist
    if (!document.getElementById('subnetCalculator')) {
        createSubnetCalculator();
    }
}

function createSubnetCalculator() {
    // Find a suitable location to add the calculator
    const addressingSection = document.getElementById('addressing');
    if (!addressingSection) return;
    
    const calculatorHTML = `
        <div class="content-block" id="subnetCalculator">
            <h3>🧮 Интерактивный калькулятор подсетей</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                <div>
                    <label for="ipInput" style="display: block; margin-bottom: 8px; font-weight: 500;">IP-адрес:</label>
                    <input type="text" id="ipInput" placeholder="192.168.1.0" 
                           style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--background-color); color: var(--text-primary);">
                </div>
                <div>
                    <label for="maskInput" style="display: block; margin-bottom: 8px; font-weight: 500;">Маска подсети:</label>
                    <select id="maskInput" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--background-color); color: var(--text-primary);">
                        <option value="24">/24 (255.255.255.0)</option>
                        <option value="25">/25 (255.255.255.128)</option>
                        <option value="26">/26 (255.255.255.192)</option>
                        <option value="27">/27 (255.255.255.224)</option>
                        <option value="28">/28 (255.255.255.240)</option>
                        <option value="29">/29 (255.255.255.248)</option>
                        <option value="30">/30 (255.255.255.252)</option>
                    </select>
                </div>
            </div>
            <button onclick="calculateSubnet()" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-bottom: 20px;">
                Рассчитать
            </button>
            <div id="subnetResult" style="background: var(--surface-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); display: none;">
                <!-- Results will be displayed here -->
            </div>
        </div>
    `;
    
    addressingSection.insertAdjacentHTML('beforeend', calculatorHTML);
}

// Calculate subnet information
function calculateSubnet() {
    const ipInput = document.getElementById('ipInput').value;
    const maskBits = parseInt(document.getElementById('maskInput').value);
    const resultDiv = document.getElementById('subnetResult');
    
    if (!isValidIP(ipInput)) {
        window.networkGuide.showNotification('Введите корректный IP-адрес', 'error');
        return;
    }
    
    const result = performSubnetCalculation(ipInput, maskBits);
    displaySubnetResult(result, resultDiv);
}

function isValidIP(ip) {
    const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!regex.test(ip)) return false;
    
    const parts = ip.split('.');
    return parts.every(part => {
        const num = parseInt(part);
        return num >= 0 && num <= 255;
    });
}

function performSubnetCalculation(ip, maskBits) {
    const ipParts = ip.split('.').map(Number);
    const maskParts = [];
    
    // Calculate subnet mask
    for (let i = 0; i < 4; i++) {
        if (maskBits >= 8) {
            maskParts.push(255);
            maskBits -= 8;
        } else if (maskBits > 0) {
            maskParts.push(256 - Math.pow(2, 8 - maskBits));
            maskBits = 0;
        } else {
            maskParts.push(0);
        }
    }
    
    // Calculate network address
    const networkParts = ipParts.map((part, i) => part & maskParts[i]);
    
    // Calculate broadcast address
    const broadcastParts = networkParts.map((part, i) => part | (255 - maskParts[i]));
    
    // Calculate number of hosts
    const hostBits = 32 - parseInt(document.getElementById('maskInput').value);
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = totalHosts - 2; // Subtract network and broadcast
    
    return {
        network: networkParts.join('.'),
        mask: maskParts.join('.'),
        broadcast: broadcastParts.join('.'),
        firstHost: networkParts.map((part, i) => i === 3 ? part + 1 : part).join('.'),
        lastHost: broadcastParts.map((part, i) => i === 3 ? part - 1 : part).join('.'),
        totalHosts: totalHosts,
        usableHosts: usableHosts
    };
}

function displaySubnetResult(result, container) {
    const html = `
        <h4 style="margin-top: 0; color: var(--primary-color);">Результаты расчета подсети:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            <div>
                <strong>Адрес сети:</strong><br>
                <code style="background: var(--background-color); padding: 4px 8px; border-radius: 4px;">${result.network}</code>
            </div>
            <div>
                <strong>Маска подсети:</strong><br>
                <code style="background: var(--background-color); padding: 4px 8px; border-radius: 4px;">${result.mask}</code>
            </div>
            <div>
                <strong>Broadcast адрес:</strong><br>
                <code style="background: var(--background-color); padding: 4px 8px; border-radius: 4px;">${result.broadcast}</code>
            </div>
            <div>
                <strong>Первый хост:</strong><br>
                <code style="background: var(--background-color); padding: 4px 8px; border-radius: 4px;">${result.firstHost}</code>
            </div>
            <div>
                <strong>Последний хост:</strong><br>
                <code style="background: var(--background-color); padding: 4px 8px; border-radius: 4px;">${result.lastHost}</code>
            </div>
            <div>
                <strong>Количество хостов:</strong><br>
                <span style="color: var(--primary-color); font-weight: 600;">${result.usableHosts} (из ${result.totalHosts})</span>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    container.style.display = 'block';
    container.classList.add('animate-fadeIn');
}

// DNS Resolution Demo
function initializeDNSDemo() {
    const dnsSection = document.getElementById('dns');
    if (!dnsSection) return;
    
    const dnsHTML = `
        <div class="content-block">
            <h3>🔍 Интерактивная демонстрация DNS</h3>
            <div style="margin: 20px 0;">
                <input type="text" id="dnsInput" placeholder="example.com" 
                       style="width: 70%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--background-color); color: var(--text-primary); margin-right: 10px;">
                <button onclick="simulateDNSLookup()" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
                    Разрешить DNS
                </button>
            </div>
            <div id="dnsSteps" style="display: none; background: var(--surface-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color);">
                <!-- DNS resolution steps will be displayed here -->
            </div>
        </div>
    `;
    
    dnsSection.insertAdjacentHTML('beforeend', dnsHTML);
}

function simulateDNSLookup() {
    const domain = document.getElementById('dnsInput').value.trim();
    const stepsDiv = document.getElementById('dnsSteps');
    
    if (!domain) {
        window.networkGuide.showNotification('Введите доменное имя', 'error');
        return;
    }
    
    const steps = [
        `1. 🔍 Проверка локального кэша для ${domain}...`,
        `2. 📡 Запрос к локальному DNS-серверу (обычно провайдера)...`,
        `3. 🌐 Запрос к корневому DNS-серверу...`,
        `4. 🏷️ Запрос к серверу зоны .com/.ru/.org...`,
        `5. 🎯 Запрос к авторитетному серверу домена ${domain}...`,
        `6. ✅ Получен IP-адрес: 93.184.216.34`,
        `7. 💾 IP-адрес сохранен в кэше (TTL: 3600 сек)`
    ];
    
    stepsDiv.style.display = 'block';
    stepsDiv.innerHTML = '<h4 style="margin-top: 0;">Процесс разрешения DNS:</h4>';
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.style.cssText = `
                margin: 10px 0;
                padding: 10px;
                background: var(--background-color);
                border-radius: 4px;
                border-left: 3px solid var(--primary-color);
                opacity: 0;
                transform: translateX(-20px);
                transition: all 0.3s ease;
            `;
            stepDiv.textContent = step;
            stepsDiv.appendChild(stepDiv);
            
            // Animate in
            setTimeout(() => {
                stepDiv.style.opacity = '1';
                stepDiv.style.transform = 'translateX(0)';
            }, 100);
            
        }, index * 800);
    });
}

// ARP Protocol Demo
function initializeARPDemo() {
    const arpSection = document.getElementById('arp');
    if (!arpSection) return;
    
    const arpHTML = `
        <div class="content-block">
            <h3>📋 Демонстрация протокола ARP</h3>
            <div style="margin: 20px 0;">
                <button onclick="simulateARPRequest()" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                    Симулировать ARP запрос
                </button>
                <button onclick="showARPTable()" style="background: var(--secondary-color); color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
                    Показать ARP таблицу
                </button>
            </div>
            <div id="arpDemo" style="min-height: 200px; background: var(--surface-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color);">
                <div style="text-align: center; color: var(--text-muted);">
                    Нажмите кнопку для демонстрации ARP протокола
                </div>
            </div>
        </div>
    `;
    
    arpSection.insertAdjacentHTML('beforeend', arpHTML);
}

function simulateARPRequest() {
    const demoDiv = document.getElementById('arpDemo');
    
    const steps = [
        {
            title: "1. Начальная ситуация",
            content: "Компьютер 192.168.1.100 хочет отправить данные на 192.168.1.10, но не знает его MAC-адрес"
        },
        {
            title: "2. ARP запрос (Broadcast)",
            content: "Отправляется широковещательный запрос: 'Кто имеет IP 192.168.1.10? Сообщите MAC на 00:1A:2B:3C:4D:5E'"
        },
        {
            title: "3. ARP ответ (Unicast)",
            content: "Устройство с IP 192.168.1.10 отвечает: 'Это мой IP! Мой MAC: 00:AA:BB:CC:DD:EE'"
        },
        {
            title: "4. Обновление ARP таблицы",
            content: "Компьютер сохраняет соответствие: 192.168.1.10 ↔ 00:AA:BB:CC:DD:EE"
        },
        {
            title: "5. Передача данных",
            content: "Теперь данные могут быть отправлены напрямую, используя известный MAC-адрес"
        }
    ];
    
    demoDiv.innerHTML = '';
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.style.cssText = `
                margin: 15px 0;
                padding: 15px;
                background: var(--background-color);
                border-radius: 8px;
                border-left: 4px solid var(--primary-color);
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease;
            `;
            
            stepDiv.innerHTML = `
                <h4 style="margin: 0 0 8px 0; color: var(--primary-color);">${step.title}</h4>
                <p style="margin: 0; color: var(--text-secondary);">${step.content}</p>
            `;
            
            demoDiv.appendChild(stepDiv);
            
            setTimeout(() => {
                stepDiv.style.opacity = '1';
                stepDiv.style.transform = 'translateY(0)';
            }, 100);
            
        }, index * 1000);
    });
}

function showARPTable() {
    const demoDiv = document.getElementById('arpDemo');
    
    const arpTable = [
        { ip: '192.168.1.1', mac: '00:AA:BB:CC:DD:EE', type: 'dynamic' },
        { ip: '192.168.1.10', mac: '00:11:22:33:44:55', type: 'dynamic' },
        { ip: '192.168.1.50', mac: '00:FF:EE:DD:CC:BB', type: 'static' },
        { ip: '192.168.1.100', mac: '00:1A:2B:3C:4D:5E', type: 'local' }
    ];
    
    const tableHTML = `
        <h4 style="margin-top: 0; color: var(--primary-color);">ARP Таблица</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <thead>
                <tr style="background: var(--border-color);">
                    <th style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">IP-адрес</th>
                    <th style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">MAC-адрес</th>
                    <th style="padding: 10px; text-align: left; border: 1px solid var(--border-color);">Тип</th>
                </tr>
            </thead>
            <tbody>
                ${arpTable.map(entry => `
                    <tr>
                        <td style="padding: 8px; border: 1px solid var(--border-color);">${entry.ip}</td>
                        <td style="padding: 8px; border: 1px solid var(--border-color); font-family: var(--font-mono);">${entry.mac}</td>
                        <td style="padding: 8px; border: 1px solid var(--border-color);">
                            <span style="background: ${entry.type === 'static' ? '#ef4444' : entry.type === 'local' ? '#10b981' : '#3b82f6'}; 
                                         color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px;">
                                ${entry.type}
                            </span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div style="margin-top: 15px; font-size: 14px; color: var(--text-muted);">
            <strong>Типы записей:</strong><br>
            • <strong>dynamic:</strong> автоматически созданные записи<br>
            • <strong>static:</strong> вручную добавленные записи<br>
            • <strong>local:</strong> локальный интерфейс
        </div>
    `;
    
    demoDiv.innerHTML = tableHTML;
    demoDiv.classList.add('animate-fadeIn');
}

// Ethernet Frame Demo
function initializeEthernetFrame() {
    const ethernetSection = document.getElementById('ethernet');
    if (!ethernetSection) return;
    
    const frameHTML = `
        <div class="content-block">
            <h3>📦 Интерактивная структура Ethernet кадра</h3>
            <div id="ethernetFrame" style="margin: 20px 0;">
                <div class="frame-visualization">
                    <div class="frame-part preamble" data-info="preamble" style="background: #ff6b6b; color: white; padding: 10px; border-radius: 4px; margin: 2px; cursor: pointer; flex: 1; text-align: center; font-size: 12px;">
                        Преамбула<br>8 байт
                    </div>
                    <div class="frame-part dest-mac" data-info="dest-mac" style="background: #4ecdc4; color: white; padding: 10px; border-radius: 4px; margin: 2px; cursor: pointer; flex: 1; text-align: center; font-size: 12px;">
                        MAC назначения<br>6 байт
                    </div>
                    <div class="frame-part src-mac" data-info="src-mac" style="background: #45b7d1; color: white; padding: 10px; border-radius: 4px; margin: 2px; cursor: pointer; flex: 1; text-align: center; font-size: 12px;">
                        MAC источника<br>6 байт
                    </div>
                    <div class="frame-part type" data-info="type" style="background: #f9ca24; color: white; padding: 10px; border-radius: 4px; margin: 2px; cursor: pointer; flex: 1; text-align: center; font-size: 12px;">
                        Тип/Длина<br>2 байта
                    </div>
                    <div class="frame-part payload" data-info="payload" style="background: #6c5ce7; color: white; padding: 10px; border-radius: 4px; margin: 2px; cursor: pointer; flex: 3; text-align: center; font-size: 12px;">
                        Полезная нагрузка<br>46-1500 байт
                    </div>
                    <div class="frame-part fcs" data-info="fcs" style="background: #fd79a8; color: white; padding: 10px; border-radius: 4px; margin: 2px; cursor: pointer; flex: 1; text-align: center; font-size: 12px;">
                        FCS (CRC)<br>4 байта
                    </div>
                </div>
            </div>
            <div id="frameInfo" style="background: var(--surface-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); margin-top: 20px;">
                <div style="text-align: center; color: var(--text-muted);">
                    Наведите курсор на части кадра для получения подробной информации
                </div>
            </div>
        </div>
    `;
    
    ethernetSection.insertAdjacentHTML('beforeend', frameHTML);
    
    // Add styles for frame visualization
    const frameViz = document.querySelector('.frame-visualization');
    if (frameViz) {
        frameViz.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            background: var(--background-color);
            padding: 15px;
            border-radius: 8px;
            border: 2px solid var(--border-color);
        `;
    }
    
    // Add interactivity
    const frameParts = document.querySelectorAll('.frame-part');
    frameParts.forEach(part => {
        part.addEventListener('click', function() {
            showFramePartInfo(this.dataset.info);
        });
        
        part.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '10';
        });
        
        part.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
}

function showFramePartInfo(partType) {
    const frameInfo = document.getElementById('frameInfo');
    
    const partDetails = {
        preamble: {
            name: "Преамбула и SFD",
            description: "Последовательность битов для синхронизации приемника",
            content: "7 байт преамбулы (10101010...) + 1 байт SFD (10101011)",
            purpose: "Позволяет принимающему устройству настроить свои часы и определить начало кадра"
        },
        "dest-mac": {
            name: "MAC-адрес назначения",
            description: "Физический адрес получателя",
            content: "6 байт (48 бит), например: 00:1A:2B:3C:4D:5E",
            purpose: "Определяет, какое устройство должно обработать кадр"
        },
        "src-mac": {
            name: "MAC-адрес источника",
            description: "Физический адрес отправителя",
            content: "6 байт (48 бит), например: 00:AA:BB:CC:DD:EE",
            purpose: "Позволяет получателю знать, от кого пришел кадр"
        },
        type: {
            name: "Тип/Длина",
            description: "Указывает тип протокола или длину данных",
            content: "0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6",
            purpose: "Помогает определить, как обрабатывать содержимое кадра"
        },
        payload: {
            name: "Полезная нагрузка",
            description: "Фактические данные, которые нужно передать",
            content: "От 46 до 1500 байт данных (может включать заголовки IP, TCP, HTTP и т.д.)",
            purpose: "Содержит информацию, ради которой и создавался кадр"
        },
        fcs: {
            name: "Frame Check Sequence (FCS)",
            description: "Контрольная сумма для обнаружения ошибок",
            content: "4-байтная CRC32 сумма всего кадра",
            purpose: "Позволяет обнаружить повреждения кадра при передаче"
        }
    };
    
    const info = partDetails[partType];
    if (!info) return;
    
    const html = `
        <h4 style="margin-top: 0; color: var(--primary-color);">${info.name}</h4>
        <p style="margin: 10px 0;"><strong>Описание:</strong> ${info.description}</p>
        <p style="margin: 10px 0;"><strong>Содержимое:</strong> ${info.content}</p>
        <p style="margin: 10px 0;"><strong>Назначение:</strong> ${info.purpose}</p>
    `;
    
    frameInfo.innerHTML = html;
    frameInfo.classList.add('animate-fadeIn');
}

// Wi-Fi Frequencies Visualization
function initializeWiFiFrequencies() {
    const wifiSection = document.getElementById('wifi');
    if (!wifiSection) return;
    
    const frequencyHTML = `
        <div class="content-block">
            <h3>📡 Интерактивная диаграмма частот Wi-Fi</h3>
            <div id="wifiFrequencies" style="margin: 20px 0;">
                <div style="margin-bottom: 20px;">
                    <button onclick="showFrequencyBand('2.4')" style="background: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                        2.4 ГГц
                    </button>
                    <button onclick="showFrequencyBand('5')" style="background: var(--secondary-color); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        5 ГГц
                    </button>
                </div>
                <div id="frequencyDisplay" style="background: var(--surface-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color); min-height: 200px;">
                    <div style="text-align: center; color: var(--text-muted);">
                        Выберите частотный диапазон для просмотра каналов
                    </div>
                </div>
            </div>
        </div>
    `;
    
    wifiSection.insertAdjacentHTML('beforeend', frequencyHTML);
}

function showFrequencyBand(band) {
    const display = document.getElementById('frequencyDisplay');
    
    if (band === '2.4') {
        const channels = [
            { num: 1, freq: '2412', overlap: false },
            { num: 2, freq: '2417', overlap: true },
            { num: 3, freq: '2422', overlap: true },
            { num: 4, freq: '2427', overlap: true },
            { num: 5, freq: '2432', overlap: true },
            { num: 6, freq: '2437', overlap: false },
            { num: 7, freq: '2442', overlap: true },
            { num: 8, freq: '2447', overlap: true },
            { num: 9, freq: '2452', overlap: true },
            { num: 10, freq: '2457', overlap: true },
            { num: 11, freq: '2462', overlap: false },
            { num: 12, freq: '2467', overlap: true },
            { num: 13, freq: '2472', overlap: true }
        ];
        
        const html = `
            <h4 style="margin-top: 0; color: var(--primary-color);">Диапазон 2.4 ГГц</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 15px 0;">
                ${channels.map(ch => `
                    <div style="background: ${ch.overlap ? '#ff6b6b' : '#4ecdc4'}; color: white; padding: 8px; border-radius: 4px; text-align: center; min-width: 60px; cursor: pointer;"
                         onclick="showChannelInfo(${ch.num}, '${ch.freq}', ${ch.overlap})">
                        <div style="font-weight: bold;">CH ${ch.num}</div>
                        <div style="font-size: 11px;">${ch.freq} МГц</div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 15px; font-size: 14px;">
                <div style="margin-bottom: 8px;">
                    <span style="display: inline-block; width: 15px; height: 15px; background: #4ecdc4; margin-right: 8px; border-radius: 2px;"></span>
                    Неперекрывающиеся каналы (рекомендуется)
                </div>
                <div>
                    <span style="display: inline-block; width: 15px; height: 15px; background: #ff6b6b; margin-right: 8px; border-radius: 2px;"></span>
                    Перекрывающиеся каналы (может быть интерференция)
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: var(--background-color); border-radius: 4px; border-left: 3px solid var(--primary-color);">
                <strong>Рекомендация:</strong> Используйте каналы 1, 6, 11 для минимальной интерференции
            </div>
        `;
        
        display.innerHTML = html;
    } else if (band === '5') {
        const html = `
            <h4 style="margin-top: 0; color: var(--primary-color);">Диапазон 5 ГГц</h4>
            <div style="margin: 15px 0;">
                <div style="background: var(--background-color); padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                    <h5 style="margin: 0 0 10px 0;">Преимущества 5 ГГц:</h5>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>Больше неперекрывающихся каналов</li>
                        <li>Меньше загруженность</li>
                        <li>Более высокие скорости</li>
                        <li>Меньше интерференции от бытовых устройств</li>
                    </ul>
                </div>
                <div style="background: var(--background-color); padding: 15px; border-radius: 4px;">
                    <h5 style="margin: 0 0 10px 0;">Недостатки 5 ГГц:</h5>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>Меньший радиус действия</li>
                        <li>Хуже проникает через стены</li>
                        <li>Выше энергопотребление</li>
                    </ul>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin: 15px 0;">
                <div style="background: #4ecdc4; color: white; padding: 10px; border-radius: 4px; text-align: center;">
                    <div style="font-weight: bold;">36-48</div>
                    <div style="font-size: 12px;">5180-5240 МГц</div>
                </div>
                <div style="background: #4ecdc4; color: white; padding: 10px; border-radius: 4px; text-align: center;">
                    <div style="font-weight: bold;">52-64</div>
                    <div style="font-size: 12px;">5260-5320 МГц</div>
                </div>
                <div style="background: #4ecdc4; color: white; padding: 10px; border-radius: 4px; text-align: center;">
                    <div style="font-weight: bold;">100-144</div>
                    <div style="font-size: 12px;">5500-5720 МГц</div>
                </div>
                <div style="background: #4ecdc4; color: white; padding: 10px; border-radius: 4px; text-align: center;">
                    <div style="font-weight: bold;">149-165</div>
                    <div style="font-size: 12px;">5745-5825 МГц</div>
                </div>
            </div>
        `;
        
        display.innerHTML = html;
    }
    
    display.classList.add('animate-fadeIn');
}

function showChannelInfo(channel, frequency, overlaps) {
    const message = overlaps 
        ? `Канал ${channel} (${frequency} МГц) может перекрываться с соседними каналами`
        : `Канал ${channel} (${frequency} МГц) - неперекрывающийся канал, рекомендуется для использования`;
    
    window.networkGuide.showNotification(message, overlaps ? 'error' : 'success');
}

// Interactive Terminal
function initializeInteractiveTerminal() {
    const diagnosticsSection = document.getElementById('diagnostics');
    if (!diagnosticsSection) return;
    
    const terminalHTML = `
        <div class="content-block">
            <h3>💻 Интерактивный терминал диагностики</h3>
            <div id="terminal" style="background: #1a1a1a; color: #00ff00; font-family: var(--font-mono); padding: 20px; border-radius: 8px; margin: 20px 0; height: 400px; overflow-y: auto;">
                <div id="terminalOutput">
                    <div>Linux Network Diagnostic Terminal v1.0</div>
                    <div>Введите команду или 'help' для списка доступных команд</div>
                    <div style="margin-top: 10px;">user@networkguide:~$ <span id="cursor" style="background: #00ff00; color: #1a1a1a;">_</span></div>
                </div>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="executeCommand('ping google.com')" class="terminal-btn">ping google.com</button>
                <button onclick="executeCommand('ip addr')" class="terminal-btn">ip addr</button>
                <button onclick="executeCommand('netstat -tulnp')" class="terminal-btn">netstat -tulnp</button>
                <button onclick="executeCommand('arp -a')" class="terminal-btn">arp -a</button>
                <button onclick="executeCommand('dig google.com')" class="terminal-btn">dig google.com</button>
                <button onclick="executeCommand('traceroute google.com')" class="terminal-btn">traceroute</button>
            </div>
        </div>
    `;
    
    diagnosticsSection.insertAdjacentHTML('beforeend', terminalHTML);
    
    // Add styles for terminal buttons
    const style = document.createElement('style');
    style.textContent = `
        .terminal-btn {
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-mono);
            font-size: 12px;
            transition: var(--transition);
        }
        .terminal-btn:hover {
            background: var(--border-color);
        }
    `;
    document.head.appendChild(style);
    
    // Make cursor blink
    setInterval(() => {
        const cursor = document.getElementById('cursor');
        if (cursor) {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }
    }, 500);
}

function executeCommand(command) {
    const output = document.getElementById('terminalOutput');
    const cursor = document.getElementById('cursor');
    
    // Add command to output
    const commandLine = document.createElement('div');
    commandLine.innerHTML = `user@networkguide:~$ ${command}`;
    output.appendChild(commandLine);
    
    // Simulate command execution
    setTimeout(() => {
        const result = getCommandOutput(command);
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = result;
        resultDiv.style.marginBottom = '10px';
        output.appendChild(resultDiv);
        
        // Add new prompt
        const newPrompt = document.createElement('div');
        newPrompt.innerHTML = 'user@networkguide:~$ <span id="cursor" style="background: #00ff00; color: #1a1a1a;">_</span>';
        output.appendChild(newPrompt);
        
        // Remove old cursor
        if (cursor) {
            cursor.remove();
        }
        
        // Scroll to bottom
        const terminal = document.getElementById('terminal');
        terminal.scrollTop = terminal.scrollHeight;
        
    }, Math.random() * 1000 + 500); // Random delay to simulate real execution
}

function getCommandOutput(command) {
    const outputs = {
        'ping google.com': `
PING google.com (142.250.74.206) 56(84) bytes of data.
64 bytes from google.com (142.250.74.206): icmp_seq=1 ttl=118 time=15.2 ms
64 bytes from google.com (142.250.74.206): icmp_seq=2 ttl=118 time=14.8 ms
64 bytes from google.com (142.250.74.206): icmp_seq=3 ttl=118 time=15.1 ms
--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss
round-trip min/avg/max/mdev = 14.834/15.033/15.234/0.165 ms`,
        
        'ip addr': `
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN
    inet 127.0.0.1/8 scope host lo
2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0
3: wlan0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc mq state UP
    inet 192.168.1.105/24 brd 192.168.1.255 scope global wlan0`,
    
        'netstat -tulnp': `
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1234/sshd
tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      5678/postfix
tcp6       0      0 :::80                   :::*                    LISTEN      9012/apache2
udp        0      0 0.0.0.0:53              0.0.0.0:*                           3456/dnsmasq
udp        0      0 0.0.0.0:67              0.0.0.0:*                           7890/dhcpd`,

        'arp -a': `
gateway (192.168.1.1) at 00:aa:bb:cc:dd:ee [ether] on eth0
server (192.168.1.10) at 00:11:22:33:44:55 [ether] on eth0
printer (192.168.1.200) at 00:ff:ee:dd:cc:bb [ether] on eth0`,

        'dig google.com': `
; &lt;&lt;&gt;&gt; DiG 9.16.1 &lt;&lt;&gt;&gt; google.com
;; global options: +cmd
;; Got answer:
;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             299     IN      A       142.250.74.206

;; Query time: 23 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Wed Jan 01 12:00:00 UTC 2024`,

        'traceroute google.com': `
traceroute to google.com (142.250.74.206), 30 hops max, 60 byte packets
 1  gateway (192.168.1.1)  1.234 ms  1.123 ms  1.456 ms
 2  10.0.0.1 (10.0.0.1)  15.123 ms  14.987 ms  15.234 ms
 3  provider-gw.net (203.0.113.1)  25.456 ms  24.789 ms  25.123 ms
 4  * * *
 5  google-peer.net (198.51.100.1)  35.678 ms  36.123 ms  35.456 ms
 6  google.com (142.250.74.206)  40.123 ms  39.987 ms  40.234 ms`,

        'help': `
Доступные команды:
  ping &lt;host&gt;        - проверить доступность хоста
  ip addr            - показать сетевые интерфейсы
  netstat -tulnp     - показать активные соединения
  arp -a             - показать ARP таблицу
  dig &lt;domain&gt;       - DNS запрос
  traceroute &lt;host&gt;  - трассировка маршрута
  help               - показать эту справку
  clear              - очистить терминал`
    };
    
    if (command === 'clear') {
        document.getElementById('terminalOutput').innerHTML = `
            <div>Linux Network Diagnostic Terminal v1.0</div>
            <div>Введите команду или 'help' для списка доступных команд</div>
        `;
        return '';
    }
    
    return outputs[command] || `bash: ${command}: command not found`;
}

// Copy buttons for code examples
function initializeCopyButtons() {
    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('code');
    
    codeBlocks.forEach(code => {
        if (code.textContent.trim().length > 10) {
            const button = document.createElement('button');
            button.textContent = '📋';
            button.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 4px 8px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            button.onclick = () => {
                window.networkGuide.copyToClipboard(code.textContent);
            };
            
            const container = code.parentElement;
            container.style.position = 'relative';
            container.appendChild(button);
            
            container.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });
            
            container.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });
        }
    });
}

// Export functions
window.networkInteractive = {
    calculateSubnet,
    simulateDNSLookup,
    simulateARPRequest,
    showARPTable,
    showFramePartInfo,
    showFrequencyBand,
    executeCommand,
    showChannelInfo
};