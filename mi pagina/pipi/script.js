function mostrarInfo(infoId) {
    // Ocultar todas las secciones de información
    const todasLasInfo = document.querySelectorAll('.info');
    todasLasInfo.forEach(info => {
        info.classList.add('oculto');

        const extra = info.querySelector('.info-extra');
        const boton = info.querySelector('.btn-mas-info');

        if (extra) {
            extra.classList.add('oculto');
        }

        if (boton) {
            boton.textContent = 'Mostrar más';
        }
    });
    
    // Mostrar la información elegida
    const infoElegida = document.getElementById(infoId);
    if (infoElegida) {
        infoElegida.classList.remove('oculto');
    }
}

function toggleExtraInfo(boton) {
    const bloqueInfo = boton.closest('.info');
    const extra = bloqueInfo.querySelector('.info-extra');

    if (!extra) {
        return;
    }

    extra.classList.toggle('oculto');
    boton.textContent = extra.classList.contains('oculto') ? 'Mostrar más' : 'Mostrar menos';
}

// Funciones para el menú desplegable
function toggleMenu() {
    const menu = document.getElementById('menuDesplegable');
    menu.classList.toggle('abierto');
}

function cerrarMenu() {
    const menu = document.getElementById('menuDesplegable');
    menu.classList.remove('abierto');
}

// Cerrar menú cuando se presiona Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarMenu();
    }
});

// Cerrar menú cuando se hace clic fuera de él
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menuDesplegable');
    const hamburguesa = document.querySelector('.menu-hamburguesa');
    
    // Si el menú está abierto y el click no fue en el menú ni en el botón
    if (menu.classList.contains('abierto') && 
        !menu.contains(event.target) && 
        !hamburguesa.contains(event.target)) {
        cerrarMenu();
    }
});

const btnVolverArriba = document.getElementById('btnVolverArriba');

function actualizarBotonVolverArriba() {
    if (window.scrollY > 220) {
        btnVolverArriba.classList.add('visible');
    } else {
        btnVolverArriba.classList.remove('visible');
    }
}

if (btnVolverArriba) {
    btnVolverArriba.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', actualizarBotonVolverArriba);
    window.addEventListener('load', actualizarBotonVolverArriba);
}

const formularioSugerencias = document.querySelector('.form-sugerencias');

if (formularioSugerencias) {
    formularioSugerencias.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombreInput = formularioSugerencias.querySelector('input');
        const sugerenciaInput = formularioSugerencias.querySelector('textarea');
        const nombre = nombreInput.value.trim();
        const sugerencia = sugerenciaInput.value.trim();

        if (!sugerencia) {
            alert('Escribe una sugerencia antes de enviarla.');
            return;
        }

        const asunto = encodeURIComponent('Nueva sugerencia para mi página web');
        const cuerpo = encodeURIComponent(
            `Nombre: ${nombre || 'Anónimo'}\n\nSugerencia:\n${sugerencia}`
        );

        window.location.href = `mailto:danieldurangofranco@gmail.com?subject=${asunto}&body=${cuerpo}`;

        formularioSugerencias.reset();
    });
}
