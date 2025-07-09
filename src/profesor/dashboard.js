import { cerrarSesion, obtenerRol } from '../utils/authGuard.js';
import cargarAsistencia from './asistencia.js';
import cargarUniforme from './uniforme.js';
import cargarCorreo from './correo.js';

const app = document.getElementById('app');

const cargarDashboard = () => {
    app.innerHTML = `
        <div class="text-center">
            <h1 class="text-3xl mb-4">Panel Profesor</h1>
            <div class="space-y-3">
                <button id="btnAsistencia">Tomar Asistencia</button>
                <button id="btnUniforme">Revisar Uniforme</button>
                <button id="btnCorreo">Enviar Correo</button>
                <button id="btnSalir">Cerrar Sesión</button>
            </div>
        </div>
    `;

    document.getElementById('btnAsistencia').addEventListener('click', cargarAsistencia);
    document.getElementById('btnUniforme').addEventListener('click', cargarUniforme);
    document.getElementById('btnCorreo').addEventListener('click', cargarCorreo);
    document.getElementById('btnSalir').addEventListener('click', cerrarSesion);
};

export default cargarDashboard;
