document.addEventListener('DOMContentLoaded', () => {

    // 1. BARRA DE PROGRESO DE SCROLL & NAVBAR
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Barra de progreso
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 2. EFECTO 3D TILT EN LAS TARJETAS DE ANIMALES
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X del ratón en la tarjeta
            const y = e.clientY - rect.top;  // Posición Y del ratón en la tarjeta
            
            // Calcular rotación (máximo 15 grados)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Restaurar posición original al salir
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease"; // Suavizar el retorno
        });
        
        // Quitar la transición durante el movimiento para que sea fluido
        card.addEventListener('mouseenter', () => {
            card.style.transition = "none";
        });
    });

    // 3. FORMULARIO COMUNIDAD
    const form = document.getElementById('feedbackForm');
    const successMsg = document.getElementById('successMsg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        successMsg.classList.remove('hidden');
    });

    // 4. LÓGICA DEL ASISTENTE IA INNOVADOR
    const aiBtn = document.getElementById('aiBtn');
    const aiChat = document.getElementById('aiChat');
    const closeAi = document.getElementById('closeAi');
    const chatMessages = document.getElementById('chatMessages');
    const inputMsg = document.getElementById('userMsg');

    aiBtn.addEventListener('click', () => {
        aiChat.style.display = aiChat.style.display === 'block' ? 'none' : 'block';
    });

    closeAi.addEventListener('click', () => {
        aiChat.style.display = 'none';
    });

    // Enviar pregunta predefinida (Chips)
    window.askAI = function(tema) {
        let question = "";
        let response = "";

        if (tema === 'clima') {
            question = "¿Cómo es el clima?";
            response = "☁️ Al ser un bosque montano, el clima es húmedo y frío, especialmente por las tardes debido a la neblina constante. ¡Lleva una buena casaca!";
        } else if (tema === 'llegar') {
            question = "¿Cómo llegar desde San Ramón?";
            response = "🚙 Desde San Ramón el viaje dura aprox. 1.5 a 2 horas en auto por trocha. Es recomendable ir en una movilidad alta (4x4) o contratar un tour en la plaza.";
        } else if (tema === 'curioso') {
            question = "Dime un dato curioso";
            response = "💡 <b>¿Sabías qué?</b> Pampa Hermosa actúa como una 'esponja gigante' que atrapa el agua de la niebla y nutre los ríos subterráneos que abastecen a todo el valle de Chanchamayo.";
        }

        printChat(question, response);
    }

    // Enviar pregunta escrita manualmente
    window.sendManualMsg = function() {
        const txt = inputMsg.value.trim();
        if(txt === "") return;
        
        printChat(txt, "🌿 Esa es una gran pregunta. Como soy una IA en fase beta para el santuario, te recomiendo enviar esa duda en la sección de 'Comunidad' abajo. ¡Te responderemos pronto!");
        inputMsg.value = "";
    }

    // Permitir enviar con Enter
    inputMsg.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendManualMsg();
        }
    });

    function printChat(userText, botText) {
        // Mensaje de usuario
        const userDiv = document.createElement('div');
        userDiv.className = 'msg user';
        userDiv.innerText = userText;
        chatMessages.appendChild(userDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulador "Escribiendo..."
        const typingDiv = document.createElement('div');
        typingDiv.className = 'msg bot';
        typingDiv.innerHTML = '<i>Escribiendo... ✍️</i>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Respuesta del Bot con delay
        setTimeout(() => {
            chatMessages.removeChild(typingDiv); // Quitar "Escribiendo"
            const botDiv = document.createElement('div');
            botDiv.className = 'msg bot';
            botDiv.innerHTML = botText;
            chatMessages.appendChild(botDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
});
