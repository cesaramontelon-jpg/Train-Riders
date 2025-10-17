// app.js
class TrainRidersApp {
    constructor() {
        this.rutas = [
            {
                id: 1,
                nombre: "Ruta de la Costa Norte",
                origenDestino: "Bilbao - Santander",
                duracion: "3h 15min",
                precio: "€38",
                realizada: false
            },
            {
                id: 2,
                nombre: "Tren de la Fresa",
                origenDestino: "Madrid - Aranjuez",
                duracion: "1h",
                precio: "€25",
                realizada: true
            }
        ];
        this.init();
    }

    init() {
        this.renderRutas();
        this.actualizarEstadisticas();
    }

    agregarRuta() {
        const nombre = document.getElementById('nombreRuta').value;
        const origenDestino = document.getElementById('origenDestino').value;
        const duracion = document.getElementById('duracion').value;
        const precio = document.getElementById('precio').value;

        if (!nombre || !origenDestino || !duracion || !precio) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const nuevaRuta = {
            id: Date.now(),
            nombre,
            origenDestino,
            duracion,
            precio,
            realizada: false
        };

        this.rutas.push(nuevaRuta);
        this.renderRutas();
        this.actualizarEstadisticas();
        this.limpiarFormulario();
        
        // Efecto visual
        this.mostrarNotificacion('¡Ruta agregada correctamente!', 'success');
    }

    marcarRealizada(boton) {
        const rutaElement = boton.closest('.ruta');
        const rutaId = parseInt(rutaElement.dataset.id);
        
        const ruta = this.rutas.find(r => r.id === rutaId);
        if (ruta) {
            ruta.realizada = !ruta.realizada;
            this.renderRutas();
            this.actualizarEstadisticas();
            
            const mensaje = ruta.realizada ? 
                '¡Ruta marcada como realizada! 🎉' : 
                'Ruta marcada como pendiente';
            this.mostrarNotificacion(mensaje, 'info');
        }
    }

    renderRutas() {
        const listaRutas = document.getElementById('listaRutas');
        listaRutas.innerHTML = '';

        this.rutas.forEach(ruta => {
            const rutaElement = document.createElement('div');
            rutaElement.className = `ruta ${ruta.realizada ? 'realizada' : ''}`;
            rutaElement.dataset.id = ruta.id;

            rutaElement.innerHTML = `
                <div class="ruta-info">
                    <h3>${ruta.nombre}</h3>
                    <p>🚄 ${ruta.origenDestino}</p>
                    <span class="ruta-details">⏱️ ${ruta.duracion} • 💰 ${ruta.precio}</span>
                </div>
                <button onclick="app.marcarRealizada(this)" class="${ruta.realizada ? 'btn-undo' : 'btn-complete'}">
                    ${ruta.realizada ? '↶ Por Experimentar' : '✅ Marcar como Realizada'}
                </button>
            `;

            listaRutas.appendChild(rutaElement);
        });
    }

    actualizarEstadisticas() {
        const totalRutas = this.rutas.length;
        const rutasRealizadas = this.rutas.filter(r => r.realizada).length;
        const rutasPendientes = totalRutas - rutasRealizadas;

        document.getElementById('totalRutas').textContent = totalRutas;
        document.getElementById('rutasRealizadas').textContent = rutasRealizadas;
        document.getElementById('rutasPendientes').textContent = rutasPendientes;
    }

    limpiarFormulario() {
        document.getElementById('nombreRuta').value = '';
        document.getElementById('origenDestino').value = '';
        document.getElementById('duracion').value = '';
        document.getElementById('precio').value = '';
    }

    mostrarNotificacion(mensaje, tipo) {
        // Crear notificación temporal
        const notificacion = document.createElement('div');
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${tipo === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notificacion.textContent = mensaje;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }

    // Filtros
    filtrarTodas() {
        this.actualizarBotonesFiltro('todas');
        this.renderRutas();
    }

    filtrarPendientes() {
        this.actualizarBotonesFiltro('pendientes');
        const rutasFiltradas = this.rutas.filter(r => !r.realizada);
        this.renderRutasFiltradas(rutasFiltradas);
    }

    filtrarCompletadas() {
        this.actualizarBotonesFiltro('completadas');
        const rutasFiltradas = this.rutas.filter(r => r.realizada);
        this.renderRutasFiltradas(rutasFiltradas);
    }

    actualizarBotonesFiltro(filtroActivo) {
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (filtroActivo === 'todas') {
            document.querySelector('.btn-filter:nth-child(1)').classList.add('active');
        } else if (filtroActivo === 'pendientes') {
            document.querySelector('.btn-filter:nth-child(2)').classList.add('active');
        } else if (filtroActivo === 'completadas') {
            document.querySelector('.btn-filter:nth-child(3)').classList.add('active');
        }
    }

    renderRutasFiltradas(rutasFiltradas) {
        const listaRutas = document.getElementById('listaRutas');
        listaRutas.innerHTML = '';

        rutasFiltradas.forEach(ruta => {
            const rutaElement = document.createElement('div');
            rutaElement.className = `ruta ${ruta.realizada ? 'realizada' : ''}`;
            rutaElement.dataset.id = ruta.id;

            rutaElement.innerHTML = `
                <div class="ruta-info">
                    <h3>${ruta.nombre}</h3>
                    <p>🚄 ${ruta.origenDestino}</p>
                    <span class="ruta-details">⏱️ ${ruta.duracion} • 💰 ${ruta.precio}</span>
                </div>
                <button onclick="app.marcarRealizada(this)" class="${ruta.realizada ? 'btn-undo' : 'btn-complete'}">
                    ${ruta.realizada ? '↶ Por Experimentar' : '✅ Marcar como Realizada'}
                </button>
            `;

            listaRutas.appendChild(rutaElement);
        });
    }
}

// Inicializar la aplicación
const app = new TrainRidersApp();

// Funciones globales para los botones
function agregarRuta() {
    app.agregarRuta();
}

function marcarRealizada(boton) {
    app.marcarRealizada(boton);
}

function filtrarTodas() {
    app.filtrarTodas();
}

function filtrarPendientes() {
    app.filtrarPendientes();
}

function filtrarCompletadas() {
    app.filtrarCompletadas();
}

// Agregar animación CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);