import {cargarAdminMenu, adminMenuActions } from './admin-menu.js'
 
const app = document.getElementById('app');

const cargarAdminDashboard = () => {

  
  app.innerHTML = cargarAdminMenu() + `  
  <section class="admin-dashboard">
      <h1>Panel del Administrador</h1>
  </section>
  `;

  adminMenuActions();

  
};

export default cargarAdminDashboard;
