import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';
import {closeAllModals} from '../../utils/helpers.js';
import {cargarAdminMenu, adminMenuActions } from './admin-menu.js';
import cargarAdminDashboard from './dashboard.js';

const app = document.getElementById('app');

const cargarUsuarios = async () => {

    const token = obtenerToken();
    const usuarios = await apiFetch('/usuarios', 'GET', null, token);
    const niveles = await apiFetch('/niveles', 'GET', null, token);
    const rol = localStorage.getItem('rol');

     if (!Array.isArray(usuarios)) {
        app.innerHTML = `<p class="text-red-500 text-center">❌ Error al cargar niveles. Verifica tu acceso.</p>`;
        return;
    }
    
    app.innerHTML = cargarAdminMenu() + `
        <div class="p-5 ">
            <h2 class="">Gestionar Usuarios</h2>
            
            <div class="container-fluid bg-white rouded shadow p-5">
            
                <div class="row mb-3">          
                    <div class="col">
                        <h4>Lista de Usuarios</h4>
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
                                        <th>Usuario</th>
                                        <th>Perfil</th>
                                        <th>Nivel</th>                        
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody class="table-group-divider">

                                    ${usuarios.map( (usuario, index) => {
                                        return `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>${usuario.username}</td>
                                            <td>${usuario.perfil}</td>
                                            <td>
                                            ${
                                                (
                                                    () => {
                                                        if(usuario.nivel !== null) {
                                                            return usuario.nivel.nombre;
                                                        } else {
                                                            return ``;
                                                        }
                                                    }
                                                )()
                                            }
                                            </td>
                                            <td>
                                            ${(
                                                () => {
                                                    if(rol == 'administrador'){
                                                        return `
                                                            <button class="btn btn-warning btnEliminarElemento" data-id="${usuario.id}" data-name="${usuario.username}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar Elemento">
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
                                </table>

                            </div>

                        </div>
                    </div>
                </div>

                <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Agragar Usuario</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="formAdd">
                                    <div class="mb-3">
                                        <label for="usernameInp" class="form-label">Correo electronico del usuario</label>
                                        <input type="email" name="username" class="form-control" placeholder="este será usado como nombre de usuario" required id="usernameInp" aria-describedby="emailHelp">
                                    </div>
                                    <div class="mb-3">
                                        <label for="passwordInp" class="form-label">Clave</label>
                                        <input type="password" name="password" class="form-control" placeholder="Clave para las credenciales" required id="passwordInp" aria-describedby="emailHelp">
                                    </div>
                                    <div class="mb-3">
                                        <label for="perfilInp" class="form-label">Perfil del usuario</label>
                                        <select class="form-select" name="perfil" id="perfilInp">
                                            <option value="profesor">Profesor</option>                                        
                                            <option value="coordinador">Coordinador</option>
                                            <option value="administrador" >Administrador</option>                                            
                                        </select>
                                    </div>
                                    <div class="mb-3" id="nivelInpWrapper">
                                        <label for="nivelInp" class="form-label">nivel del usuario</label>
                                        <select class="form-select" name="nivel_id" id="nivelInp" aria-label="Default select example">
                                            <option value="0" selected>Selecciona Nivel</option>
                                            ${niveles.map( 
                                                (nivel, index) => {
                                                    return `<option value="${nivel.id}">${nivel.nombre}</option>`;
                                                })
                                            }
                                            
                                        </select>
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
        console.log(data);
        let resultado = await apiFetch('/usuarios', 'POST', data , token);
        console.log(resultado);
        closeAllModals();
        cargarUsuarios();
    });

    document.getElementById('perfilInp').addEventListener('change', (evt) => {
        if(evt.target.value == 'profesor') {
            document.getElementById('nivelInpWrapper').style.display = 'block';
        } else {
            document.getElementById('nivelInpWrapper').style.display = 'none';
            evt.target.value = null;
        }
    });

    document.querySelectorAll('.btnEliminarElemento').forEach(btn => {
        btn.addEventListener('click', async () => {
        console.log(btn);
        let gradoNombre = btn.getAttribute('data-name');
        if (confirm('¿Seguro que deseas eliminar el grado ' + gradoNombre + '?')) {
            const id = btn.getAttribute('data-id');
            await apiFetch(`/usuarios/${id}`, 'DELETE', null, token);
            cargarUsuarios();
        }
        });
    });



    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


}


export default cargarUsuarios;