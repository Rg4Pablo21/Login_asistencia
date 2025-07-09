const app = document.getElementById('app');

// Simulamos grados y alumnos
const grados = {
    '1ro Básico': ['Ana', 'Luis', 'Carlos'],
    '2do Básico': ['María', 'Pedro', 'Sofía'],
    '3ro Básico': ['Andrés', 'Lucía', 'Diego']
};

const cargarAsistencia = () => {
    let html = `<h2 class="text-xl mb-2">Tomar Asistencia</h2>`;

    for (let grado in grados) {
        html += `<h3 class="text-lg mt-4">${grado}</h3>`;
        html += `<div class="mb-2">
            <button onclick="marcarTodos('${grado}', true)">Marcar Todos Presentes</button>
            <button onclick="marcarTodos('${grado}', false)">Marcar Todos Ausentes</button>
        </div>`;
        html += `<ul id="lista-${grado.replace(/\s/g, '')}">`;
        grados[grado].forEach((alumno, i) => {
            html += `
                <li>
                    <label>
                        <input type="checkbox" data-grado="${grado}" name="asistencia-${grado}-${i}" checked>
                        ${alumno}
                    </label>
                </li>
            `;
        });
        html += `</ul>`;
    }

    html += `<button class="mt-4" onclick="guardarAsistencia()">Guardar Asistencia</button>`;
    app.innerHTML = html;

    window.marcarTodos = (grado, estado) => {
        const checkboxes = document.querySelectorAll(`#lista-${grado.replace(/\s/g, '')} input`);
        checkboxes.forEach(cb => cb.checked = estado);
    };

    window.guardarAsistencia = () => {
        alert('✅ Asistencia registrada correctamente (simulada)');
        // Aquí conectarás con el backend más adelante
    };
};

export default cargarAsistencia;
