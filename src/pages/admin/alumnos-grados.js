import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';
import {closeAllModals} from '../../utils/helpers.js';
import {cargarAdminMenu, adminMenuActions } from './admin-menu.js';
import cargarAdminDashboard from './dashboard.js';
import cargarNotificacionesPorAlumno from './historial-notificaciones.js'; 

const app = document.getElementById('app');

const cargarAlmunosPorGradoId = async (id) => {

    const token = obtenerToken();
    const alumnos = await apiFetch('/grados/' + id + '/alumnos', 'GET', null, token);
    const gradoActual = await apiFetch('/grados/' + id, 'GET', null, token);
    const nivelActual = await apiFetch('/niveles/' + gradoActual.nivel_id, 'GET', null, token);
    const rol = localStorage.getItem('rol');
    var totalAsistenciasGrado = 0;
    var totalAusenciasGrado = 0;

     if (!Array.isArray(alumnos)) {
        app.innerHTML = `<p class="text-red-500 text-center">❌ Error al cargar niveles. Verifica tu acceso.</p>`;
        return;
    }
    
    app.innerHTML = cargarAdminMenu() + `
        <div class="p-5 ">
        <h2 class="">Gestionar Alumnos</h2>
        <h1>${nivelActual.nombre} > ${gradoActual.nombre}</h1>
        
        <div class="container-fluid bg-white rouded shadow p-5">
        
            <div class="row mb-3">          
                <div class="col">
                    <h4>Lista de Alumnos</h4>
                </div>
                <div class="col text-end">
                    
                    <button class="btn btn-success text-white"  data-bs-toggle="modal" data-bs-target="#addModal">
                        <i class="fa-solid fa-plus"></i> Agregar
                    </button>

                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="border rounded p-2 my-2 ">
                        Opciones: 
                            <button class="btn btn-primary btn-sm" id="btnNotificacionToAll" data-bs-toggle="modal" data-bs-target="#composeNotificacionModal">Notificar a todos</button>
                    </div>
                </div>
            </div>

            <div class="row p-2 my-3">
                <div class="col-12">
                    <h3>Graficas de Asistencia</h3>
                </div>
                <div class="col border rounded m-2">
                    <div id="chart1" width="100%" style="margin:0 auto;">
                    </div>
                </div>

                <div class="col border rounded m-2" style="margin:0 auto;">
                    <div id="chart2" width="100%">
                        
                    </div>
                </div>
            </div>


            <div class="row">
            <div class="col">
                <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Alumno</th>
                        <th>Email</th>
                        <th>Encargados</th>
                        <th>Telefonos de los encargados</th>
                        <th>Emails de los encargados</th>
                        <th class="text-center">Asistencias</th>
                        <th class="text-center">Ausencias</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody class="table-group-divider">

                    ${alumnos.map( (alumno, index) => {
                        totalAsistenciasGrado += alumno.total_asistencias;
                        totalAusenciasGrado += alumno.total_ausencias;
                        return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${alumno.nombre}</td>
                            <td>${alumno.email}</td>
                            <td>${alumno.encargados}</td>
                            <td>${alumno.telefono_encargados}</td>
                            <td>${alumno.email_encargado}</td>
                            <td class="text-center">${alumno.total_asistencias}</td>
                            <td class="text-center">${alumno.total_ausencias}</td>
                            <td class="text-center">
                                <button class="btn btn-warning btnEliminarElemento" data-id="${alumno.id}" data-name="${alumno.nombre}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar Elemento">
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                                <button class="btn btn-primary btnHistorialNotificaciones" data-alumno-id="${alumno.id}">
                                    <i class="fa-solid fa-envelope-open-text"></i>
                                </button>

                            
                            
                            </td>
                        </tr>
                        `;
                    })}

                    </tbody>
                    <tfoot class="table-group-divider">
                        <th colspan="6" class="text-end">Totales</th>
                        <th class="text-center">${totalAsistenciasGrado}</th>
                        <th class="text-center">${totalAusenciasGrado}</th>
                        <th></th>
                    </tfoot>
                </table>

                </div>

            </div>
            </div>
        </div>

        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agragar Alumno a ${gradoActual.nombre}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form id="formAdd">

                    <div class="mb-3">
                        <label for="nombreInp" class="form-label">Nombre del Alumno</label>
                        <input type="text" name="nombre" class="form-control" placeholder="Nombre del alumno" required id="nombreInp" aria-describedby="emailHelp">
                    </div>

                    <div class="mb-3">
                        <label for="nombreInp" class="form-label">Email del Alumno</label>
                        <input type="email" name="email" class="form-control" placeholder="Email del alumno" required id="emailInp" aria-describedby="emailHelp">
                    </div>

                    <div class="mb-3">
                        <label for="encargadosInp" class="form-label">Encargados del Alumno</label>
                        <input type="email" name="encargados" class="form-control" placeholder="encargados del Alumno" required id="encargadosInp" aria-describedby="emailHelp">
                    </div>

                    <div class="mb-3">
                        <label for="telefonoEncargadosInp" class="form-label">Telefonos de los encargados</label>
                        <input type="email" name="telefono_encargados" class="form-control" placeholder="telefonoEncargados del Alumno" required id="telefonoEncargadosInp" aria-describedby="emailHelp">
                    </div>

                    <div class="mb-3">
                        <label for="emailEncargadosInp" class="form-label">emails de los encargados</label>
                        <input type="email" name="email_encargado" class="form-control" placeholder="emailEncargados del Alumno" required id="emailEncargadosInp" aria-describedby="emailHelp">
                    </div>

                </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary cerrarModalBtn" id="cerrarModalBtn" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="crearBtn">Crear</button>
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
                        <h5 class="modal-title">Enviar Notificación a todos los alumnos</h5>
                        <h4>${gradoActual.nombre}</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formNotificacion">
                            <div class="mb-3">
                                <label for="mensajeInp" class="form-label">Mensaje a enviar</label>
                                <textarea type="text" name="mensaje" class="form-control" placeholder="El mensaje que llegará a los correos electronicos" required id="mensajeInp" rows="8"></textarea>
                                <input type="hidden" name="grado_id" required id="gradoIdInp" value="${gradoActual.id}">
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

    document.getElementById('crearBtn').addEventListener('click', async (evt) => {
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
    });

    document.querySelectorAll('.btnHistorialNotificaciones').forEach(btn => {
        btn.addEventListener('click', async () => {
            console.log(btn);
            let alumnoId = btn.getAttribute('data-alumno-id');
            cargarNotificacionesPorAlumno(alumnoId);
        });
    });

    

    document.getElementById('enviarBtn').addEventListener( 'click', async (evt) => {
        evt.preventDefault();

        evt.target.disabled = true;
        evt.target.innerText = "Enviando...";

        let notificacionFormElement = document.getElementById('formNotificacion');
        let notificacionForm = new FormData(notificacionFormElement);
        let data = Object.fromEntries(notificacionForm.entries());
        
        console.log(data);
        let resultado = await apiFetch('/asistencias/notificarAll', 'POST', data , token);
        closeAllModals();
        notificacionFormElement.reset();
        alert('notificacion enviada');
        
        evt.target.disabled = false;
        evt.target.innerText = "Enviar";
        
        
    });




    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


    let asistenciaData = {
        asistencias : totalAsistenciasGrado,
        ausensias : totalAusenciasGrado
    }

    google.charts.setOnLoadCallback(dibujarPieAsistencia(asistenciaData));
    google.charts.setOnLoadCallback(dibujarLineaAsistenciaPorAlumno(alumnos));
    


}


const dibujarPieAsistencia = (asistenciaData) => {

    console.log(asistenciaData)

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'tipo');
    data.addColumn('number', 'suma');
    data.addRows([
        ['asistencias', asistenciaData.asistencias],
        ['ausencias', asistenciaData.ausensias]
    ]);

    // Set chart options
    var options = {'title':'Proporcion de Asistencia VS Inasistencia',
                    'width':400,
                    'height':400};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart1'));
    chart.draw(data, options);
}

const dibujarLineaAsistenciaPorAlumno = (alumnosData) => {

    console.log(alumnosData)

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Alumno');
    data.addColumn('number', 'Asistencias');
    data.addColumn('number', 'Ausencia');

    let rows = [];

    
    var options = {'title':'Asistencias VS Ausencias por Alunmo',
                    'width':800,
                    'height':400};
    for(let i = 0; i < alumnosData.length; i++) {
        let row = [
            alumnosData[i].nombre,
            alumnosData[i].total_asistencias,
            alumnosData[i].total_ausencias
        ]
        rows.push(row);

        if(i == alumnosData.length -1) {
            data.addRows(rows);
            var chart = new google.charts.Line(document.getElementById('chart2'));
            chart.draw(data, google.charts.Line.convertOptions(options))
        }
    }
    
}


export default cargarAlmunosPorGradoId;