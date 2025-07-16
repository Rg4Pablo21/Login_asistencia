import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';
import {closeAllModals} from '../../utils/helpers.js';
import {cargarAdminMenu, adminMenuActions } from './admin-menu.js';
import cargarAdminDashboard from './dashboard.js';
import cargarAlmunosPorGradoId from './alumnos-grados.js';
import cargarAsistenciaPorGradoId from './asistencia-grado.js';

const app = document.getElementById('app');

const cargarNotificacionesPorAlumno = async (alumnoId) => {
    const token = obtenerToken();

    const notificaciones = await apiFetch('/alumnos/' + alumnoId + '/notificaciones', 'GET', null, token);
    const alumno = await apiFetch('/alumnos/' + alumnoId, 'GET', null, token);
    console.log(notificaciones);
    console.log(alumno);


    app.innerHTML = cargarAdminMenu();

    if (!Array.isArray(notificaciones)) {
        app.innerHTML += `
            <div class="alert alert-warning" role="alert">
                <i class="fa-solid fa-triangle-exclamation"></i> Error al obtener las notificaciones
            </div>
        `;
        return;
    }

    

     app.innerHTML += `
            <div class="p-5 ">
                <h3 class="">Historial de notificaciones enviadas a </h3>
                <h2>${alumno.nombre}</h2>
                <div class="container-fluid bg-white rouded shadow p-5 my-5">
                    ${notificaciones.map( 
                        (notificacion, index) => {
                            return `
                                <div class="row rounded border shadow p-3 bg-body-tertiary mb-5">
                                    <div class="col-12">

                                        <figure>
                                            <blockquote class="blockquote ">
                                                <p class="mb-2">${notificacion.mensaje}.</p>
                                            </blockquote>
                                            <figcaption class="blockquote-footer">
                                                Fecha de envio <strong>${notificacion.fecha}</strong>
                                            </figcaption>
                                            <figcaption class="blockquote-footer">
                                                Destinatarios: <strong<cite title="Source Title">${notificacion.email}</cite></strong>
                                            </figcaption>
                                        </figure>

                                    </div>
                                </div>
                            `
                        }
                    )}
                </div>
            </div>`;
            adminMenuActions();


}

export default cargarNotificacionesPorAlumno;