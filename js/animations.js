// Animations JavaScript

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {
    initializeOSIAnimation();
    initializeNetworkAnimation();
    initializeLANAnimation();
    initializeVLANAnimation();
    initializeScrollAnimations();
    initializeHoverEffects();
}

// OSI Model Animation
function initializeOSIAnimation() {
    const animateBtn = document.getElementById('animateOSI');
    const dataFlow = document.getElementById('dataFlow');
    const layers = document.querySelectorAll('.layer');
    
    if (animateBtn) {
        animateBtn.addEventListener('click', function() {
            animateDataTransmission();
        });
    }
    
    // Layer hover effects
    layers.forEach((layer, index) => {
        layer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = 'var(--shadow-lg)';
            this.style.borderColor = 'var(--primary-color)';
        });
        
        layer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'var(--shadow)';
            this.style.borderColor = 'var(--border-color)';
        });
        
        layer.addEventListener('click', function() {
            highlightLayer(index + 1);
        });
    });
}

// Animate data transmission through OSI layers
function animateDataTransmission() {
    const dataFlow = document.getElementById('dataFlow');
    const layers = document.querySelectorAll('.layer');
    const dataPacket = dataFlow.querySelector('.data-packet');
    
    // Show data flow
    dataFlow.style.opacity = '1';
    
    // Reset all layers
    layers.forEach(layer => {
        layer.classList.remove('osi-layer-active');
    });
    
    // Animate through each layer
    layers.forEach((layer, index) => {
        setTimeout(() => {
            // Remove previous active state
            if (index > 0) {
                layers[index - 1].classList.remove('osi-layer-active');
            }
            
            // Add active state to current layer
            layer.classList.add('osi-layer-active');
            
            // Update data packet position
            const layerRect = layer.getBoundingClientRect();
            const flowRect = dataFlow.getBoundingClientRect();
            const relativeTop = layerRect.top - flowRect.top;
            
            dataPacket.style.transform = `translateY(${relativeTop + 20}px)`;
            
            // Remove active state after animation
            if (index === layers.length - 1) {
                setTimeout(() => {
                    layer.classList.remove('osi-layer-active');
                    dataFlow.style.opacity = '0';
                    dataPacket.style.transform = 'translateY(-200px)';
                }, 1000);
            }
        }, index * 600);
    });
}

// Highlight specific OSI layer
function highlightLayer(layerNumber) {
    const layers = document.querySelectorAll('.layer');
    const targetLayer = document.querySelector(`[data-layer="${layerNumber}"]`);
    
    // Remove highlight from all layers
    layers.forEach(layer => {
        layer.classList.remove('osi-layer-active');
    });
    
    // Highlight target layer
    if (targetLayer) {
        targetLayer.classList.add('osi-layer-active');
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            targetLayer.classList.remove('osi-layer-active');
        }, 2000);
        
        // Show layer details
        showLayerDetails(layerNumber);
    }
}

// Show layer details
function showLayerDetails(layerNumber) {
    const layerDetails = {
        1: {
            name: "Физический уровень",
            description: "Передача битов по кабелю или радиоканалу",
            examples: ["Витая пара", "Оптоволокно", "Wi-Fi", "Bluetooth"],
            data: "Биты (0 и 1)"
        },
        2: {
            name: "Канальный уровень", 
            description: "Передача кадров, MAC-адреса, обнаружение ошибок",
            examples: ["Ethernet", "Wi-Fi", "PPP", "Frame Relay"],
            data: "Кадры (Frames)"
        },
        3: {
            name: "Сетевой уровень",
            description: "Маршрутизация, IP-адресация, передача между сетями",
            examples: ["IP", "ICMP", "ARP", "OSPF"],
            data: "Пакеты (Packets)"
        },
        4: {
            name: "Транспортный уровень",
            description: "Надежная доставка, порты, деление на сегменты",
            examples: ["TCP", "UDP", "SCTP"],
            data: "Сегменты"
        },
        5: {
            name: "Сеансовый уровень",
            description: "Управление сессиями, синхронизация",
            examples: ["NetBIOS", "RPC", "SQL", "NFS"],
            data: "Данные"
        },
        6: {
            name: "Уровень представления",
            description: "Кодировка, шифрование, сжатие",
            examples: ["SSL/TLS", "JPEG", "GIF", "MPEG"],
            data: "Данные"
        },
        7: {
            name: "Прикладной уровень",
            description: "Протоколы приложений",
            examples: ["HTTP", "FTP", "SMTP", "DNS"],
            data: "Данные"
        }
    };
    
    const details = layerDetails[layerNumber];
    if (details) {
        window.networkGuide.showNotification(
            `${details.name}: ${details.description}`,
            'info'
        );
    }
}

// Network Animation (Introduction)
function initializeNetworkAnimation() {
    const networkViz = document.getElementById('introAnimation');
    if (!networkViz) return;
    
    const devices = networkViz.querySelectorAll('.device');
    
    // Animate devices on load
    devices.forEach((device, index) => {
        setTimeout(() => {
            device.classList.add('animate-fadeInScale');
            device.style.animationDelay = `${index * 0.2}s`;
        }, 500);
    });
    
    // Create connection lines
    createConnectionLines(networkViz);
    
    // Add click interaction
    devices.forEach(device => {
        device.addEventListener('click', function() {
            this.classList.add('animate-bounce');
            setTimeout(() => {
                this.classList.remove('animate-bounce');
            }, 1000);
        });
    });
}

// Create animated connection lines
function createConnectionLines(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    // Create lines between devices
    const lines = [
        { start: '20%', end: '40%', startY: '50%', endY: '50%' },
        { start: '40%', end: '60%', startY: '50%', endY: '50%' },
        { start: '60%', end: '80%', startY: '50%', endY: '50%' }
    ];
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineElement.setAttribute('x1', line.start);
            lineElement.setAttribute('y1', line.startY);
            lineElement.setAttribute('x2', line.end);
            lineElement.setAttribute('y2', line.endY);
            lineElement.setAttribute('stroke', 'var(--primary-color)');
            lineElement.setAttribute('stroke-width', '2');
            lineElement.setAttribute('stroke-dasharray', '5,5');
            lineElement.classList.add('connection-line');
            
            svg.appendChild(lineElement);
        }, index * 300);
    });
    
    container.appendChild(svg);
}

// LAN Animation
function initializeLANAnimation() {
    const lanViz = document.getElementById('lanVisualization');
    if (!lanViz) return;
    
    const devices = lanViz.querySelectorAll('.device');
    const centralSwitch = lanViz.querySelector('.central-switch');
    
    // Animate devices connecting to switch
    let delay = 0;
    devices.forEach(device => {
        setTimeout(() => {
            device.classList.add('animate-pulse');
            
            // Create data transmission effect
            setTimeout(() => {
                createDataPulse(device, centralSwitch);
            }, 500);
        }, delay);
        delay += 200;
    });
    
    // Switch animation
    if (centralSwitch) {
        setTimeout(() => {
            centralSwitch.classList.add('animate-glow');
        }, 1000);
    }
}

// Create data pulse animation
function createDataPulse(from, to) {
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();
    const container = from.closest('.lan-visualization');
    
    const pulse = document.createElement('div');
    pulse.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        left: ${fromRect.left - container.getBoundingClientRect().left}px;
        top: ${fromRect.top - container.getBoundingClientRect().top + 20}px;
        z-index: 10;
        box-shadow: 0 0 10px var(--primary-color);
    `;
    
    container.appendChild(pulse);
    
    // Animate to center
    const deltaX = (toRect.left - fromRect.left);
    const deltaY = (toRect.top - fromRect.top);
    
    pulse.style.transition = 'all 1s ease-in-out';
    setTimeout(() => {
        pulse.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        pulse.style.opacity = '0';
    }, 100);
    
    // Remove pulse
    setTimeout(() => {
        container.removeChild(pulse);
    }, 1100);
}

// VLAN Animation
function initializeVLANAnimation() {
    const vlanDemo = document.getElementById('vlanDemo');
    if (!vlanDemo) return;
    
    const vlanGroups = vlanDemo.querySelectorAll('.vlan-group');
    
    vlanGroups.forEach((group, index) => {
        group.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.filter = 'brightness(1.1)';
            
            // Animate devices in this VLAN
            const devices = this.querySelectorAll('.device');
            devices.forEach(device => {
                device.classList.add('animate-pulse');
            });
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
            
            // Stop device animation
            const devices = this.querySelectorAll('.device');
            devices.forEach(device => {
                device.classList.remove('animate-pulse');
            });
        });
        
        group.addEventListener('click', function() {
            demonstrateVLANIsolation(index);
        });
    });
}

// Demonstrate VLAN isolation
function demonstrateVLANIsolation(activeVLAN) {
    const vlanGroups = document.querySelectorAll('.vlan-group');
    
    vlanGroups.forEach((group, index) => {
        if (index === activeVLAN) {
            group.style.opacity = '1';
            group.style.transform = 'scale(1.1)';
            group.style.filter = 'brightness(1.2)';
        } else {
            group.style.opacity = '0.3';
            group.style.transform = 'scale(0.95)';
            group.style.filter = 'brightness(0.7)';
        }
    });
    
    // Show isolation message
    window.networkGuide.showNotification(
        `VLAN ${activeVLAN + 1} изолирована от других VLAN`,
        'info'
    );
    
    // Reset after 3 seconds
    setTimeout(() => {
        vlanGroups.forEach(group => {
            group.style.opacity = '1';
            group.style.transform = 'scale(1)';
            group.style.filter = 'brightness(1)';
        });
    }, 3000);
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .equipment-card, .timeline-item, .passive-item, .layer, .tcpip-layer'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add different animations based on element type
                if (element.classList.contains('feature-card')) {
                    element.classList.add('animate-slideInFromBottom');
                } else if (element.classList.contains('equipment-card')) {
                    element.classList.add('animate-slideInFromLeft');
                } else if (element.classList.contains('timeline-item')) {
                    element.classList.add('animate-slideInFromRight');
                } else if (element.classList.contains('layer') || element.classList.contains('tcpip-layer')) {
                    element.classList.add('animate-fadeInScale');
                } else {
                    element.classList.add('animate-fadeIn');
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Staggered animation for grids
    const grids = document.querySelectorAll('.features-grid, .equipment-grid');
    grids.forEach(grid => {
        const gridObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-slideInFromBottom');
                        }, index * 100);
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        gridObserver.observe(grid);
    });
}

// Hover effects
function initializeHoverEffects() {
    // Equipment cards hover effect
    const equipmentCards = document.querySelectorAll('.equipment-card');
    equipmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.querySelector('.feature-icon').style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.details-btn, .animate-btn, .tab-button, .model-tab');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Particle effect for special sections
function createParticleEffect(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * container.offsetWidth + 'px';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (container.contains(particle)) {
                    container.removeChild(particle);
                }
            }, 5000);
        }, i * 100);
    }
}

// Typing animation for code examples
function typeText(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, speed);
}

// Progress animation
function animateProgress(element, targetValue, duration = 1000) {
    const start = 0;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = start + (targetValue - start) * progress;
        element.style.width = currentValue + '%';
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Morphing shape animation
function morphShape(element, newPath, duration = 500) {
    const currentPath = element.getAttribute('d');
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple interpolation (would need proper path interpolation for complex shapes)
        if (progress >= 1) {
            element.setAttribute('d', newPath);
        } else {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Export animation functions
window.networkAnimations = {
    highlightLayer,
    animateDataTransmission,
    createParticleEffect,
    typeText,
    animateProgress,
    morphShape,
    demonstrateVLANIsolation
};