export const guardarToken = (token, rol) => {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
};

export const obtenerToken = () => localStorage.getItem('token');
export const obtenerRol = () => localStorage.getItem('rol');

export const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    location.reload();
};
