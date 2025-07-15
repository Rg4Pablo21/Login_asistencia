import { apiFetch } from '../../utils/api.js';
import { obtenerToken } from '../../utils/authGuard.js';
import {closeAllModals} from '../../utils/helpers.js';
import {cargarAdminMenu, adminMenuActions } from './admin-menu.js';
import cargarAdminDashboard from './dashboard.js';
import cargarGradosPorNivelId from './grados-nivel.js';

const app = document.getElementById('app');

const cargarNiveles = async () => {
  const token = obtenerToken();
  const niveles = await apiFetch('/niveles', 'GET', null, token);
  const rol = localStorage.getItem('rol');
  

  if (!Array.isArray(niveles)) {
    app.innerHTML = `<p class="text-red-500 text-center">❌ Error al cargar niveles. Verifica tu acceso.</p>`;
    return;
  }

  app.innerHTML = cargarAdminMenu() + `
    <div class="p-5 ">
      <h2 class="">Gestionar Niveles</h2>
      
      <div class="container-fluid bg-white rouded shadow p-5">
      
        <div class="row mb-3">          
          <div class="col">
            <h4>Lista de niveles</h4>
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
                    <th>Nivel</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">

                  ${niveles.map( (nivel, index) => {
                    return `
                      <tr>
                        <td>${index + 1}</td>
                        <td>${nivel.nombre}</td>
                        <td>
                          ${(
                              () => {
                                  if(rol == 'administrador'){
                                      return `
                                          <button class="btn btn-warning btnEliminarNivel" data-id="${nivel.id}" data-name="${nivel.nombre}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar Elemento">
                                            <i class="fa-solid fa-trash"></i>
                                          </button>
                                      `;
                                  } else {
                                      return ``;
                                  }
                              }
                          )()}
                          

                          <button class="btn btn-info btnCargarGrados" data-id="${nivel.id}" data-bs-toggle="tooltip">
                            <i class="fa-solid fa-eye"></i> Grados
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
              <h5 class="modal-title">Agragar Nivel</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="formNivel">
                  <div class="mb-3">
                    <label for="nombreInp" class="form-label">Nombre del Nivel</label>
                    <input type="text" name="nombre" class="form-control" placeholder="Nombre del nivel (Ej: Básico, Diversificado)" required id="nombreInp" aria-describedby="emailHelp">
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

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  document.getElementById('crearBtn').addEventListener('click', async (evt) => {
    evt.preventDefault();
    let nombre = document.getElementById('nombreInp');
    let resultado = await apiFetch('/niveles', 'POST', { nombre : nombre.value }, token);
    console.log(resultado);
    closeAllModals();
    cargarNiveles();
  })

  document.getElementById('formNivel').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    await apiFetch('/niveles', 'POST', { nombre }, token);
    closeAllModals();
    cargarNiveles();
  });

  document.querySelectorAll('.formGrado').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nivel_id = e.target.getAttribute('data-nivel');
      const nombre = e.target.nombre.value;
      await apiFetch(`/admin/grados`, 'POST', { nombre, nivel_id }, token);
      cargarNiveles();
    });
  });

  document.querySelectorAll('.btnEliminarNivel').forEach(btn => {
    btn.addEventListener('click', async () => {
      console.log(btn);
      let nivelNombre = btn.getAttribute('data-name');
      if (confirm('¿Seguro que deseas eliminar el nivel ' + nivelNombre + '?')) {
        const id = btn.getAttribute('data-id');
        await apiFetch(`/niveles/${id}`, 'DELETE', null, token);
        cargarNiveles();
      }
    });
  });



  document.getElementById('btnVolver').addEventListener('click', () => {
    cargarAdminDashboard();
  });

  document.querySelectorAll('.btnCargarGrados').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      
      console.log(123);
      cargarGradosPorNivelId(id);
      //cargarNiveles();
      
    });
  });

};

export default cargarNiveles;
