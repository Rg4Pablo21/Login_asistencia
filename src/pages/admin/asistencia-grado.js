import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';
import {closeAllModals} from '../../utils/helpers.js';
import {cargarAdminMenu, adminMenuActions } from './admin-menu.js';
import cargarAdminDashboard from './dashboard.js';

const app = document.getElementById('app');

const cargarAsistenciaPorGradoId = async (id) => {

    const token = obtenerToken();
    const alumnos = await apiFetch('/grados/' + id + '/alumnos', 'GET', null, token);
    const gradoActual = await apiFetch('/grados/' + id, 'GET', null, token);
    const nivelActual = await apiFetch('/niveles/' + id, 'GET', null, token);
    const rol = localStorage.getItem('rol');
    var current = {};
    var selectedFecha;
    
     if (!Array.isArray(alumnos)) {
        app.innerHTML = `<p class="text-red-500 text-center">❌ Error al cargar niveles. Verifica tu acceso.</p>`;
        return;
    }
    
    app.innerHTML = cargarAdminMenu() + `
        <div class="p-5 ">
            <h2 class="">Toma de Asistencia</h2>
            <h1>
                ${nivelActual.nombre} > ${gradoActual.nombre} > <input type='date' id="fechaAsistencia" />
            </h1>
            
            <div class="container-fluid bg-white rouded shadow p-5">
            
                <div class="row mb-3">          
                <div class="col">
                    <h4>Lista de Alumnos</h4>
                </div>
                <div class="col text-end">
                    
                    <button class="btn btn-success text-white" id="btnGuardarAsistencia">
                        <i class="fa-solid fa-floppy-disk"></i> Guardar Asistencia
                    </button>

                </div>
                </div>

                <div class="row">
                <div class="col">
                    <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th rowspan="2">#</th>
                                <th rowspan="2" >Alumno</th>
                                <th colspan="3">Control</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th  class="text-center">&iquest;Asistencia?</th>
                                <th  class="text-center">&iquest;Uniforme Completo?</th>
                                <th  class="text-center">&iquest;Llegada tarde?</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">

                        ${alumnos.map( (alumno, index) => {
                            return `
                            <tr class="alumnoFila" data-alumno-id="${alumno.id}">
                                <td>${index + 1}</td>
                                <td>${alumno.nombre}</td>
                                
                                <td class="text-center">
                                    <input class="form-check-input" type="checkbox" value="1" id="asistenciaCheck_${alumno.id}">
                                </td>
                                
                                <td class="text-center">
                                    <input class="form-check-input" type="checkbox" value="1" id="uniformeCheck_${alumno.id}">
                                </td>

                                <td class="text-center">
                                    <input class="form-check-input" type="checkbox" value="1" id="tardeCheck_${alumno.id}">
                                </td>

                                <td class="text-center">
                                    <button class="btn btn-primary openNotificacionBox" data-alumno-id="${alumno.id}" data-bs-toggle="modal" data-bs-target="#composeNotificacionModal">
                                        <i class="fa-solid fa-envelope"></i>
                                    </button>
                                    
                                </td>

                                
                            </tr>
                            `;
                        })}

                        </tbody>
                    </table>

                    </div>

                </div>
                </div>
            </div>


            <button id="btnVolver" class="mt-4 bg-gray-300 hover:bg-gray-400">⬅ Volver</button>
        </div>

        <div class="modal fade" id="composeNotificacionModal" tabindex="-1" aria-labelledby="composeNotificacionModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Enviar Notificación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formNotificacion">
                            <div class="mb-3">
                                <label for="mensajeInp" class="form-label">Mensaje a enviar</label>
                                <textarea type="text" name="mensaje" class="form-control" placeholder="El mensaje que llegará al correo electronico" required id="mensajeInp" rows="8"></textarea>
                                <input type="hidden" name="alumno_id" required id="alumnoIdInp" aria-describedby="emailHelp">
                            </div>                
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary cerrarModalBtn" id="cerrarModalBtn" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="enviarBtn">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
     `;

    adminMenuActions();

    /*document.getElementById('crearBtn').addEventListener('click', async (evt) => {
        evt.preventDefault();

        let addFormElement = document.getElementById('formAdd');
        const addForm = new FormData(addFormElement);
        let data = Object.fromEntries(addForm.entries());
        data.grado_id = gradoActual.id;
        console.log(data);
        let resultado = await apiFetch('/alumnos', 'POST', data , token);
        console.log(resultado);
        closeAllModals();
        cargarAlmunosPorGradoId(nivelActual.id);
    });

    document.querySelectorAll('.btnEliminarElemento').forEach(btn => {
        btn.addEventListener('click', async () => {
        console.log(btn);
        let gradoNombre = btn.getAttribute('data-name');
        if (confirm('¿Seguro que deseas eliminar el grado ' + gradoNombre + '?')) {
            const id = btn.getAttribute('data-id');
            await apiFetch(`/alumnos/${id}`, 'DELETE', null, token);
            cargarAlmunosPorGradoId(nivelActual.id);
        }
        });
    });*/

    document.getElementById('fechaAsistencia').addEventListener('change', async (evt) => {
        evt.preventDefault();

        let asistencia = await apiFetch('/asistencias/' + gradoActual.id + '/' + evt.target.value, 'GET', null, token);
        current.asistencia = asistencia.asistencia;
        current.asistencias = asistencia.asistencias;
        current.fecha = evt.target.value;
        let controlChecks = document.querySelectorAll('.form-check-input');
        for(let i = 0; i < controlChecks.length; i++){
        controlChecks[i].checked = false;
        }

        if(asistencia.asistencias && Array.isArray(asistencia.asistencias) && asistencia.asistencias.length) {
            asistencia.asistencias.forEach( (item) => {
                let alumnoID = item.alumno_id;
                if(item.ausente == 1) {
                    document.getElementById('asistenciaCheck_' + alumnoID).checked = false;
                } else {
                    document.getElementById('asistenciaCheck_' + alumnoID).checked = true;
                }

                if(item.tarde == 1) {
                    document.getElementById('tardeCheck_' + alumnoID).checked = true;
                } else {
                    document.getElementById('tardeCheck_' + alumnoID).checked = false;
                }

                if(item.uniforme_incompleto == 1) {
                    document.getElementById('uniformeCheck_' + alumnoID).checked = true;
                } else {
                    document.getElementById('uniformeCheck_' + alumnoID).checked = false;
                }
                
            } )

        }
        
        
    });

    document.getElementById('btnGuardarAsistencia').addEventListener('click', async (evt) => {
        evt.preventDefault();

        if(typeof current == 'undefined' || current == null || typeof current.fecha == 'undefined' || current.fecha == null ) {
            alert("Debes seleccionar una fecha");
            return;
        }

        //let asistencia = await apiFetch('/asistencias/' + gradoActual.id + '/' + evt.target.value, 'GET', null, token);
        console.log(evt)
        console.log(evt.target.value);

        console.log(current);

        let filas = document.querySelectorAll('.alumnoFila');
        console.log(filas);
        
        if(filas != null){

            let data = {
                asistencia_id : current.asistencia.id,
                grado_id : current.asistencia.grado_id,
                fecha : current.fecha

            }

            for(let i = 0; i < filas.length; i++){
                let alumnoId = filas[i].getAttribute('data-alumno-id');
                data.alumno_id = alumnoId;
                

                if(!document.getElementById('asistenciaCheck_' + alumnoId).checked) {
                    data.ausente = 1;
                } else {
                    data.ausente = null;
                }

                if(!document.getElementById('uniformeCheck_' + alumnoId).checked) {
                    data.uniforme_incompleto = null;                    
                } else {
                    data.uniforme_incompleto = 1;
                }

                if(!document.getElementById('tardeCheck_' + alumnoId).checked) {
                    data.tarde = null;
                } else {
                    data.tarde = 1;
                }

                console.log(data);

                await apiFetch('/asistencias/', 'POST', data, token);

            }

            
        }
        

    });

    document.querySelectorAll('.openNotificacionBox').forEach( btn => {
        btn.addEventListener( 'click', () => {
            document.getElementById('alumnoIdInp').value = btn.getAttribute('data-alumno-id');
        } )
    } );

    document.getElementById('enviarBtn').addEventListener( 'click', async (evt) => {
        evt.preventDefault();

        let notificacionFormElement = document.getElementById('formNotificacion');
        let notificacionForm = new FormData(notificacionFormElement);
        let data = Object.fromEntries(notificacionForm.entries());
        
        console.log(data);
        let resultado = await apiFetch('/asistencias/notificar', 'POST', data , token);
        closeAllModals();
        notificacionFormElement.reset();
        alert('notificacion enviada');
        
        
        
    });



    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


}


export default cargarAsistenciaPorGradoId;