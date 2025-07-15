import cargarAdminDashboard from './dashboard.js';

export function cargarAdminMenu () {
    const rol = localStorage.getItem('rol');
  return `
  <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body"  data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Control de Asistencia</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav float-start">
          <a class="nav-link" id="btnDashboard" aria-current="page" href="#">Home</a>
          <a class="nav-link" id="btnNiveles" aria-current="page" href="#">Gestiones</a>
           ${(
                () => {
                    if(rol == 'administrador' || rol == 'coordinador'){
                        return `
                            <a class="nav-link" id="btnUsuarios" aria-current="page" href="#">Usuarios</a>
                        `;
                    } else {
                        return ``;
                    }
                }
            )()}    
        </div>
        <div class="w-100">
          <a class="nav-link float-end text-warning me-3" id="btnSalir" href="#">Cerrar sesión</a> 
        </div>
        
      </div>
    </div>
  </nav>`;
}

export function adminMenuActions() {
    document.getElementById('btnNiveles').addEventListener('click', (evt) => {
        evt.preventDefault();
        import('./niveles.js').then(mod => mod.default());
    });

    if( document.getElementById('btnUsuarios') !== null ) {
        document.getElementById('btnUsuarios').addEventListener('click', () => {
            import('./usuarios.js').then(mod => mod.default());
        });
    }

    
    

    // 🔧 CORREGIDO: se agregó 'click' como primer argumento
    document.getElementById('btnSalir').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    const rol = localStorage.getItem('rol');

    document.getElementById('btnDashboard').addEventListener( 'click', (evt) => {
        evt.preventDefault();
        cargarAdminDashboard();
    } );

    

}


export default cargarAdminMenu;




