import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';
import {closeAllModals} from '../../utils/helpers.js';
import {cargarAdminMenu, adminMenuActions } from './admin-menu.js';
import cargarAdminDashboard from './dashboard.js';
import cargarAlmunosPorGradoId from './alumnos-grados.js';
import cargarAsistenciaPorGradoId from './asistencia-grado.js';

const app = document.getElementById('app');

const cargarGradosPorNivelId = async (id) => {

    const token = obtenerToken();
    const grados = await apiFetch('/niveles/' + id + '/grados', 'GET', null, token);
    const nivelActual = await apiFetch('/niveles/' + id, 'GET', null, token);
    const rol = localStorage.getItem('rol');

     if (!Array.isArray(grados)) {
        app.innerHTML = `<p class="text-red-500 text-center">❌ Error al cargar niveles. Verifica tu acceso.</p>`;
        return;
    }
    
    app.innerHTML = cargarAdminMenu() + `
        <div class="p-5 ">
        <h2 class="">Gestionar Grados</h2>
        <h1>${nivelActual.nombre}</h1>
        
        <div class="container-fluid bg-white rouded shadow p-5">
        
            <div class="row mb-3">          
                <div class="col">
                    <h4>Lista de grados</h4>
                </div>
                <div class="col text-end">
                    ${(
                        () => {
                            if(rol == 'administrador'){
                                return `
                                    <button class="btn btn-success text-white"  data-bs-toggle="modal" data-bs-target="#addModal">
                                        <i class="fa-solid fa-plus"></i> Agregar
                                    </button>
                                `;
                            } else {
                                return ``;
                            }
                        }
                    )()}
                    
                </div>
            </div>

            <div class="row">
            <div class="col">
                <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Grado</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody class="table-group-divider">

                    ${grados.map( (grado, index) => {
                        return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${grado.nombre}</td>
                            <td>
                            ${(
                                () => {
                                    if(rol == 'administrador'){
                                        return `
                                            <button class="btn btn-warning btnEliminarElemento" data-id="${grado.id}" data-name="${grado.nombre}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar Elemento">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        `;
                                    } else {
                                        return ``;
                                    }
                                }
                            )()}
                            

                            <button class="btn btn-info btnCargarAlumnos" data-id="${grado.id}" >
                                <i class="fa-solid fa-user-graduate"></i> Alumnos
                            </button>

                            <button class="btn btn-success btnCargarTomarAsistencia" data-id="${grado.id}">
                                <i class="fa-solid fa-check"></i> Asistencia
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

        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agragar grado a ${nivelActual.nombre}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form id="formNivel">
                    <div class="mb-3">
                        <label for="nombreInp" class="form-label">Nombre del Grado</label>
                        <input type="text" name="nombre" class="form-control" placeholder="Nombre del Grado" required id="nombreInp" aria-describedby="emailHelp">
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
        let nombre = document.getElementById('nombreInp');
        let data = { 
            nombre : nombre.value,
            nivel_id : nivelActual.id 
        }
        let resultado = await apiFetch('/grados', 'POST', data , token);
        console.log(resultado);
        closeAllModals();
        cargarGradosPorNivelId(nivelActual.id);
    });

    document.querySelectorAll('.btnEliminarElemento').forEach(btn => {
        btn.addEventListener('click', async () => {
        console.log(btn);
        let gradoNombre = btn.getAttribute('data-name');
        if (confirm('¿Seguro que deseas eliminar el grado ' + gradoNombre + '?')) {
            const id = btn.getAttribute('data-id');
            await apiFetch(`/grados/${id}`, 'DELETE', null, token);
            cargarGradosPorNivelId(nivelActual.id);
        }
        });
    });

    document.querySelectorAll('.btnCargarAlumnos').forEach(btn => {
        btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        
        console.log(123);
        cargarAlmunosPorGradoId(id);
        //cargarNiveles();
        
        });
    });

    document.querySelectorAll('.btnCargarTomarAsistencia').forEach(btn => {
        btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        
        console.log(123);
        cargarAsistenciaPorGradoId(id);
        //cargarNiveles();
        
        });
    });


    
    




    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


}


export default cargarGradosPorNivelId;