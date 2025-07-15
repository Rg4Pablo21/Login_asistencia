import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';
import {closeAllModals} from '../../utils/helpers.js';
import {cargarAdminMenu, adminMenuActions } from './admin-menu.js';
import cargarAdminDashboard from './dashboard.js';

const app = document.getElementById('app');

const cargarAlmunosPorGradoId = async (id) => {

    const token = obtenerToken();
    const alumnos = await apiFetch('/grados/' + id + '/alumnos', 'GET', null, token);
    const gradoActual = await apiFetch('/grados/' + id, 'GET', null, token);
    const nivelActual = await apiFetch('/niveles/' + id, 'GET', null, token);
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
                            ${(
                                () => {
                                    if(rol == 'administrador'){
                                        return `
                                            <button class="btn btn-warning btnEliminarElemento" data-id="${alumno.id}" data-name="${alumno.nombre}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar Elemento">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        `;
                                    } else {
                                        return ``;
                                    }
                                }
                            )()}

                            
                            
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



    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


}


export default cargarAlmunosPorGradoId;