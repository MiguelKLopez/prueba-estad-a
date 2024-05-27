// Función para obtener datos de los usuarios 
function obtenerDatos(){
  return fetch('../json/usuarios.json')
  .then(response =>{
    if(!response.ok){
      throw new Error('Error al obtener los datos');
    }
    return response.json();
  })
  .catch(error=>{
    console.log('Error: ', error);
  })
}

const botonIngresar = document.getElementById("boton-ingresar")
const inputUsuario = document.getElementById("input-usuario")
const inputContraseña = document.getElementById("input-contraseña")
const errorPopup = document.getElementById("error-popup");
const closePopup = document.getElementById("close-popup");

  // Credenciales correctas 
if (botonIngresar && inputUsuario && inputContraseña && errorPopup && closePopup) {
  botonIngresar.addEventListener('click', async () => {
    try {
      const respuestaLogin = await fetch('../json/usuarios.json');
      const dataLogin = await respuestaLogin.json();
      let credencialesCorrectas = false;

      for (const item of dataLogin) {
        if (inputUsuario.value === item.usuario && inputContraseña.value === item.contraseña) {
          credencialesCorrectas = true; 
          break;
        }
      }

      if (credencialesCorrectas) {
        const token = 'token_de_autenticación_generado';
        localStorage.setItem('token', token);
        window.location.href = "../html/inicio.html";
      } else {
        inputUsuario.value = "";
        inputContraseña.value = "";
        showErrorPopup();
      }
    } catch (error) {
      console.log('Error al procesar la solicitud: ', error);
    }
  });

  function showErrorPopup() {
    console.log("Mostrando el pop-up de error");
    errorPopup.classList.remove('hidden');
  }

  closePopup.addEventListener('click', () => {
    console.log("Cerrando el pop-up de error");
    errorPopup.classList.add('hidden');
  });
}

const botonUsuario = document.getElementById('usuario-icono');
const botonControlUsuario = document.getElementById('usuarios-icono')

// Redireccionar el botón del usuario a login.html
if(botonUsuario && botonControlUsuario){
  document.addEventListener('DOMContentLoaded', function() {
    if (botonUsuario) {
      botonUsuario.addEventListener('click', function() {
        window.location.href = '../html/index.html';
      });
    }
    if (botonControlUsuario) {
      botonControlUsuario.addEventListener('click', function() {
        window.location.href = '../html/control-usuarios.html';
      });
    }
  });
}

const logos = document.querySelectorAll('.barra-lateral-iconos');
const tarjetaInfo = document.getElementById('tarjeta-info');

logos.forEach(logo => {
  logo.addEventListener('mouseover', () => {
    const nombreIcono = logo.getAttribute('data-nombre');
    const posicionIcono = logo.getBoundingClientRect();
    const alturaIcono = posicionIcono.top; 

    tarjetaInfo.textContent = nombreIcono;
    tarjetaInfo.style.display = 'block';
    tarjetaInfo.style.top = `${alturaIcono}px`; 
    tarjetaInfo.style.left = `${posicionIcono.left + posicionIcono.width + 10}px`;
  });

  logo.addEventListener('mouseout', () => {
    tarjetaInfo.style.display = 'none';
  });
});

function abrirModal(usuario) {
  document.getElementById('id').value = usuario.id;
  document.getElementById('nombre').value = usuario.usuario;
  document.getElementById('contrasena').value = usuario.contraseña;
  document.getElementById('rol').value = usuario.rol;
  document.getElementById('area').value = usuario.area_procedencia;
  modal.classList.remove('hidden');
}

function cerrarModal() {
  modal.classList.add('hidden');
}

const tablaControlUsuario = document.getElementById('tabla-control-usuarios');

if (tablaControlUsuario) {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const respuesta = await fetch('../json/usuarios.json');
      const data = await respuesta.json();
      const tablaUsuarios = document.getElementById('tabla-usuarios');

      data.forEach(usuario => {
        const fila = document.createElement('tr');

        const celdaID = document.createElement('td');
        celdaID.textContent = usuario.id;
        fila.appendChild(celdaID);

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = usuario.usuario;
        celdaNombre.classList.add('nombre-usuario');
        fila.appendChild(celdaNombre);

        const celdaContraseña = document.createElement('td');
        celdaContraseña.classList.add('contraseña-celda');
        const spanContraseña = document.createElement('span');
        spanContraseña.textContent = '••••••••';
        spanContraseña.classList.add('contraseña-oculta');

        const botonMostrarContraseña = document.createElement('button');
        botonMostrarContraseña.classList.add('mostrar-contraseña-btn');
        botonMostrarContraseña.setAttribute('data-contraseña', usuario.contraseña);

        const imgMostrarContraseña = document.createElement('img');
        imgMostrarContraseña.src = '../img/view-alt-icon-128px-svg.svg';
        imgMostrarContraseña.alt = 'Mostrar Contraseña';

        botonMostrarContraseña.appendChild(imgMostrarContraseña);
        botonMostrarContraseña.addEventListener('click', () => {
          if (spanContraseña.textContent === '••••••••') {
            spanContraseña.textContent = botonMostrarContraseña.getAttribute('data-contraseña');
            imgMostrarContraseña.src = '../img/hide-alt-icon-128px-svg.svg';
            imgMostrarContraseña.alt = 'Ocultar Contraseña';
          } else {
            spanContraseña.textContent = '••••••••';
            imgMostrarContraseña.src = '../img/view-alt-icon-128px-svg.svg';
            imgMostrarContraseña.alt = 'Mostrar Contraseña';
          }
        });

        celdaContraseña.appendChild(spanContraseña);
        celdaContraseña.appendChild(botonMostrarContraseña);
        fila.appendChild(celdaContraseña);

        const celdaArea = document.createElement('td');
        const areaSpan = document.createElement('span');
        areaSpan.textContent = usuario.area_procedencia;
        areaSpan.style.backgroundColor = '#4f1788';
        areaSpan.style.color = 'white';
        areaSpan.style.borderRadius = '10px';
        areaSpan.style.padding = '5px 10px';
        fila.appendChild(celdaArea).appendChild(areaSpan);

        const celdaRol = document.createElement('td');
        const rolSpan = document.createElement('span');
        rolSpan.textContent = usuario.rol;
        rolSpan.style.backgroundColor = usuario.rol === 'Admin' ? '#00bfff' : '#32cd32';
        rolSpan.style.color = 'white';
        rolSpan.style.borderRadius = '10px';
        rolSpan.style.padding = '5px 10px';
        fila.appendChild(celdaRol).appendChild(rolSpan);

        const celdaAcciones = document.createElement('td');
        celdaAcciones.classList.add('acciones-celda');
        const botonEditar = document.createElement('button');
        const imgEditar = document.createElement('img');
        imgEditar.src = '../img/edit-icon-128px-svg.svg';
        imgEditar.alt = 'Editar';
        botonEditar.appendChild(imgEditar);
        botonEditar.classList.add('boton', 'boton-editar');
        botonEditar.addEventListener('click', () => {
            abrirModal(usuario); 
        });

        const botonEliminar = document.createElement('button');
        const imgEliminar = document.createElement('img');
        imgEliminar.src = '../img/delete-icon-128px-svg.svg';
        imgEliminar.alt = 'Eliminar';
        botonEliminar.appendChild(imgEliminar);
        botonEliminar.classList.add('boton', 'boton-eliminar');

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        tablaUsuarios.appendChild(fila);
      });

      // Inicializar el modal
      const modal = document.getElementById('modal');
      const closeModal = document.querySelector('.close');
      const formModificarUsuario = document.getElementById('form-modificar-usuario');

      closeModal.addEventListener('click', cerrarModal);

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          cerrarModal();
        }
      });

      formModificarUsuario.addEventListener('submit', (event) => {
        event.preventDefault();
        cerrarModal();
      });

    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  });
}