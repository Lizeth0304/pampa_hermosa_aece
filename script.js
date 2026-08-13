document.addEventListener('DOMContentLoaded', () => {

    // 1. EFECTO DE SCROLL EN EL NAVBAR
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. FORMULARIO INTERACTIVO (COMUNIDAD)
    const form = document.getElementById('form-opinion');
    const responseDiv = document.getElementById('feedback-response');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita recargar la página
            
            // Animación de ocultar formulario y mostrar agradecimiento
            form.style.display = 'none';
            responseDiv.style.display = 'block';
            
            // Aquí podrías conectar una base de datos o enviar un email en un proyecto real.
        });
    }

    // 3. ASISTENTE VIRTUAL IA (PampaIA)
    const aiToggleBtn = document.getElementById('aiToggle');
    const aiCloseBtn = document.getElementById('aiClose');
    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatButtons = document.querySelectorAll('.chat-opt-btn');

    // Abrir/Cerrar chat
    aiToggleBtn.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
    });

    aiCloseBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Lógica para enviar mensajes predeterminados
    chatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const questionType = btn.getAttribute('data-q');
            const questionText = btn.innerText;

            appendMessage(questionText, 'user');
            
            // Simulamos que la IA está "pensando" por 800ms
            setTimeout(() => {
                let botReply = '';

                switch(questionType) {
                    case 'ubicacion':
                        botReply = "📍 Se encuentra en la Región Junín, ingresando por <b>San Ramón (Chanchamayo)</b>. Un paraíso accesible desde la Selva Central.";
                        break;
                    case 'animales':
                        botReply = "🐾 Podrás ver especies únicas como el <b>Oso de Anteojos</b>, el <b>Mono Choro de cola amarilla</b> y el hermoso <b>Gallito de las Rocas</b>.";
                        break;
                    case 'abuelo':
                        botReply = "🌳 <b>El Abuelo</b> es el árbol de cedro más emblemático. Mide 51 metros de altura y tiene cientos de años. ¡Es la joya del bosque!";
                        break;
                }

                appendMessage(botReply, 'bot');
            }, 800);
        });
    });

    // Función auxiliar para agregar mensajes al chat
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg msg-${sender}`;
        msgDiv.innerHTML = text;
        chatBody.appendChild(msgDiv);
        
        // Mantener el scroll siempre abajo
        chatBody.scrollTop = chatBody.scrollHeight;
    }

});
