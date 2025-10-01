const busquedaEstudiantes = document.getElementById('busqueda-estudiantes');
const listadoEstudiantes = document.getElementById('listado-estudiantes');
const registroEstudiantes = document.getElementById('registro-estudiantes');
const registroNotasEstudiantes = document.getElementById('registro-notas-estudiantes');
const verEstudiante = document.getElementById('ver-estudiante');
const botonRegistroEstudiantes = document.getElementById('btn-registrar-estudiante');
const tablaEstudiantes = document.getElementById('tabla-estudiantes');
const busquedaNombre = document.getElementById('busqueda-nombre');
const filtroGrupo = document.getElementById('filtro-grupo');
const filtroGrado = document.getElementById('filtro-grado');
const filtroTipoId = document.getElementById('filtro-tipoId');
const busquedaId = document.getElementById('busqueda-id');
const botonBuscar = document.getElementById('btn-buscar-filtros');
const botonReiniciar = document.getElementById('btn-reiniciar-filtros');
const botonesFormulario = document.getElementById('botones-formulario');
const botonCancelarRegistro = document.getElementById('btn-cancelar-registro');
const botonGuardarRegistro = document.getElementById('btn-guardar-registro');
const navEstudiantes = document.getElementById('nav-estudiantes');
const navegacion = document.getElementById('navegacion');
const botonVerEstudiante = document.getElementsByClassName('btn-ver-estudiante');
const botonEliminarEstudiante = document.getElementsByClassName('btn-eliminar-estudiante');
const modalEliminar = document.getElementById('modalEliminar');


function cargarPagina() {
    busquedaEstudiantes.style.display = 'block';
    listadoEstudiantes.style.display = 'block';
    registroEstudiantes.style.display = 'none';
    registroNotasEstudiantes.style.display = 'none';
    verEstudiante.style.display = 'none';
    botonesFormulario.style.display = 'none';
    navegacion.style.display = 'none';

    renderizarTabla(estudiantes);
}

function renderizarTabla(lista) {
  tablaEstudiantes.innerHTML = "";
  lista.forEach(est => {
    tablaEstudiantes.innerHTML += `
      <tr>
        <td>${est.codigo}</td>
        <td>${est.tipoId} ${est.numeroId}</td>
        <td>${est.primerNombre || ""} ${est.segundoNombre || ""} ${est.primerApellido || ""} ${est.segundoApellido || ""}</td>
        <td>${est.cursos ? est.cursos[0].grado : est.grado}</td>
        <td>${est.cursos ? est.cursos[0].grupo : est.grupo}</td>
        <td>${est.cursos ? est.cursos[0].estado : est.estado}</td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="verEstudiante(${est.codigo})">
            <i class="bi bi-eye-fill"></i>
          </button>
          <button class="btn-eliminar-estudiante btn btn-sm btn-danger" 
            data-bs-toggle="modal" 
            data-bs-target="#modalEliminar" 
            data-nombre="${est.primerNombre} ${est.segundoNombre} ${est.primerApellido} ${est.segundoApellido}" 
            data-codigo="${est.codigo}">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
    `;
  });

  renderizarPagina(lista.length);
}

function filtrarTabla() {
  const nombre = busquedaNombre.value.toLowerCase().trim();
  const tipoId = filtroTipoId.value;
  const grado = filtroGrado.value;
  const grupo = filtroGrupo.value;
  const numeroId = busquedaId.value.trim();

  const filtrados = estudiantes.filter(est => {
    const nombreEstudiante = `${est.primerNombre || ""} ${est.segundoNombre || ""} ${est.primerApellido || ""} ${est.segundoApellido || ""}`.toLowerCase().trim();

    const coincideNombre = nombre === "" || nombreEstudiante.includes(nombre);
    const coincideTipoId = tipoId === "" || est.tipoId === tipoId;
    const coincideGrado = grado === "" || est.grado.toString() === grado;  // <- corregido
    const coincideGrupo = grupo === "" || est.grupo === grupo;
    const coincideNumeroId = numeroId === "" || est.numeroId.toString().includes(numeroId);

    return coincideNombre && coincideTipoId && coincideGrado && coincideNumeroId && coincideGrupo;
  });

  renderizarTabla(filtrados);
}
function reiniciarFiltros() {
  busquedaNombre.value = "";
  filtroTipoId.value = "";
  filtroGrado.value = "";
  filtroGrupo.value = "";
  busquedaId.value = "";

  renderizarTabla(estudiantes);
}

function guardarRegistro() {
  alert("Estudiante registrado con éxito ✅");
  cargarPagina();
}

function eliminarEstudiante() {
  alert("Estudiante Eliminado con éxito");
  cargarPagina();
}

fetch("./js/estudiantes.json")
  .then(res => res.json())
  .then(data => {
    estudiantes = data;

    renderizarTabla(estudiantes);
  })

modalEliminar.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  const nombre = button.getAttribute('data-nombre');
  const codigo = button.getAttribute('data-codigo');

  const titulo = modalEliminar.querySelector('.modal-title');
  const mensaje = modalEliminar.querySelector('.modal-body');
  
  titulo.textContent = `Eliminar ${nombre}`;
  mensaje.textContent = `¿Estás seguro que deseas eliminar al estudiante con código ${codigo}?`;
});

function registroEstudiante() {
  busquedaEstudiantes.style.display = 'none';
  listadoEstudiantes.style.display = 'none';
  registroEstudiantes.style.display = 'flex';
  registroNotasEstudiantes.style.display = 'flex';
  botonesFormulario.style.display = 'flex';
  navegacion.style.display = 'flex';
}

window.addEventListener('load', cargarPagina);
botonBuscar.addEventListener("click", filtrarTabla);
botonReiniciar.addEventListener("click", reiniciarFiltros);
botonCancelarRegistro.addEventListener("click", cargarPagina);
navEstudiantes.addEventListener("click", cargarPagina);
navegacion.addEventListener("click", cargarPagina)
botonRegistroEstudiantes.addEventListener("click", registroEstudiante);
botonEliminarEstudiante.addEventListener("click", eliminarEstudiante),
botonGuardarRegistro.addEventListener("submit", guardarRegistro)

