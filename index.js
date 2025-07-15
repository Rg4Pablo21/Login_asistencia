import renderLogin from './src/auth/login.js';
import renderDashboardAdmin from './src/pages/admin/dashboard.js';
import renderDashboardProfesor from './src/pages/profesor/dashboard.js';

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token) {
  renderLogin(); // No hay token, mostrar login
} else {
  renderDashboardAdmin();
}
