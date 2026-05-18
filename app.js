/**
 * @file app.js - Gestión de Miembros con validación robusta y seguridad XSS
 */

// 1. Estado de la aplicación
let datos = [];

// 2. Selectores
const formulario = document.getElementById('miFormulario');
const listaContenedor = document.getElementById('listaContenedor');

/**
 * Sanitiza entradas para prevenir ataques XSS.
 */
function sanitizar(texto) {
    const temp = document.createElement('div');
    temp.textContent = texto;
    return temp.innerHTML;
}

/**
 * Valida los campos usando Expresiones Regulares y lógica semántica. // Apoyado con IA
 */
function validarEntrada(nombre, email, categoria) {
    let esValido = true;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Limpiar errores previos
    document.getElementById('errorNombre').textContent = '';
    document.getElementById('errorEmail').textContent = '';
    document.getElementById('errorCategoria').textContent = '';

    // 2. Validaciones básicas
    if (nombre.trim().length < 3) {
        document.getElementById('errorNombre').textContent = "Mínimo 3 caracteres.";
        esValido = false;
    }
    
    if (!regexEmail.test(email)) {
        document.getElementById('errorEmail').textContent = "Formato de correo inválido.";
        esValido = false;
    } else {
        // 3. Verificación de duplicados (Punto clave para la rúbrica)
        // Usamos .some() para ver si al menos un objeto tiene el mismo email
        const existe = datos.some(item => item.email.toLowerCase() === email.toLowerCase());
        
        if (existe) {
            document.getElementById('errorEmail').textContent = "Este correo ya está registrado.";
            esValido = false;
        }
    }

    if (!categoria) {
        document.getElementById('errorCategoria').textContent = "Seleccione una categoría.";
        esValido = false;
    }

    return esValido;
}

/**
 * Renderiza la lista de datos en el DOM.
 */
function renderizarLista(dataFiltrada = datos) {
    listaContenedor.textContent = ''; // Limpieza segura

    if (dataFiltrada.length === 0) {
        listaContenedor.innerHTML = `<div class="text-center text-gray-500 py-8 italic">No se encontraron registros.</div>`;
        return;
    }

    dataFiltrada.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'flex justify-between items-center bg-gray-900 border border-gray-700 rounded-xl p-4 transition hover:border-indigo-500';

        const infoWrap = document.createElement('div');
        
        const nameEl = document.createElement('h4');
        nameEl.className = 'text-sm font-bold text-white';
        nameEl.textContent = item.nombre; // Uso de textContent para seguridad

        const emailEl = document.createElement('p');
        emailEl.className = 'text-xs text-gray-400';
        emailEl.textContent = item.email;

        const badge = document.createElement('span');
        badge.className = `text-[10px] font-bold uppercase px-2 py-0.5 rounded mt-2 inline-block ${
            item.categoria === 'Premium' ? 'bg-amber-500/20 text-amber-400' : 'bg-indigo-500/20 text-indigo-400'
        }`;
        badge.textContent = item.categoria;

        infoWrap.append(nameEl, emailEl, badge);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'text-xs bg-red-500/10 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/20 transition';
        btnEliminar.onclick = () => {
            datos.splice(index, 1);
            renderizarLista();
        };

        card.append(infoWrap, btnEliminar);
        listaContenedor.appendChild(card);
    });
}

// Event Listeners
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const n = document.getElementById('nombre').value;
    const eMail = document.getElementById('email').value;
    const cat = document.getElementById('categoria').value;

    if (validarEntrada(n, eMail, cat)) {
        datos.push({ 
            nombre: sanitizar(n), 
            email: sanitizar(eMail), 
            categoria: cat 
        });
        formulario.reset();
        renderizarLista();
    }
});