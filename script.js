document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animaciones tipo Fade Up al hacer scroll
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo animar la primera vez
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });

    // 2. Lógica del Asistente IA (Estilo Oreate/ChatGPT)
    const aiToggle = document.getElementById('aiToggle');
    const aiPanel = document.getElementById('aiPanel');
    const aiClose = document.getElementById('aiClose');
    const aiChat = document.getElementById('aiChat');
    const aiInput = document.getElementById('aiInput');

    // Abrir / Cerrar
    aiToggle.addEventListener('click', () => aiPanel.classList.add('active'));
    aiClose.addEventListener('click', () => aiPanel.classList.remove('active'));

    // Botones rápidos (Chips)
    window.sendQuickMsg = function(text) {
        appendMessage(text, 'user-msg');
        simulateTyping(text);
    };

    // Mensaje manual
    window.sendManualMsg = function() {
        const text = aiInput.value.trim();
        if (text === '') return;
        
        appendMessage(text, 'user-msg');
        aiInput.value = '';
        simulateTyping(text);
    };

    // Permitir enviar con Enter
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendManualMsg();
    });

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${className}`;
        msgDiv.textContent = text;
        aiChat.appendChild(msgDiv);
        aiChat.scrollTop = aiChat.scrollHeight;
    }

    function simulateTyping(query) {
        // Indicador de escribiendo
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'msg ai-msg';
        typingDiv.id = typingId;
        typingDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        aiChat.appendChild(typingDiv);
        aiChat.scrollTop = aiChat.scrollHeight;

        setTimeout(() => {
            const typingElement = document.getElementById(typingId);
            if (typingElement) typingElement.remove();

            let response = "Interesante pregunta. El santuario tiene mucho por descubrir.";
            
            if (query.includes('Ruta')) {
                response = "Desde San Ramón, debes tomar la ruta hacia el sector de Santa Rosa. Son aproximadamente 2 horas en vehículo 4x4 cruzando paisajes increíbles.";
            } else if (query.includes('Clima')) {
                response = "Es un bosque nuboso. Llévate ropa por capas: ligera para el día y casaca impermeable para la tarde. ¡No olvides tus botas de trekking!";
            }

            appendMessage(response, 'ai-msg');
        }, 1200);
    }
});
