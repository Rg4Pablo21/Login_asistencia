const API_BASE = 'https://backend-nuevooooo-1.onrender.com/api';

export const apiFetch = async (endpoint, method = 'GET', data = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    return response.json();
};
