
const url = "https://apiguarin.proyectosadso.com/api/";

let empleadosGlobales = [];
let tareasGlobales = [];
let estadosGlobales = [];

document.addEventListener('DOMContentLoaded', () => {

    mostrarEmpleados()
    mostrarTareas()
    mostrarEstados()
    mostrarAsignaciones()

});

function mostrarEmpleados()
{

    fetch(url + "empleado/get_all.php")
    .then(response => response.json())
    .then((datos) => {
    
        console.log(datos);
        empleadosGlobales = datos.data;
        llenarTablaEmpleados(datos);

    })

}

const tablaEmpleados = document.querySelector("#tablaEmpleados");

function llenarTablaEmpleados(datos)
{

    datos.data.forEach(dato => {

        const tr = document.createElement("tr");
        const tdIdentificacion = document.createElement("td");
        const tdNombre = document.createElement("td");
        const tdApellido = document.createElement("td");
        const tdTelefono = document.createElement("td");
        const tdAcciones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "me-1");
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute("data-bs-target", "#ModalEditarEmpleado");
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener('click', ()=>{

            editarEmpleado(dato);

        });

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.textContent =  "Eliminar";

        btnEliminar.addEventListener('click',()=>{
            eliminarEmpleado(dato);
        });

        tdIdentificacion.textContent = dato.identificacion;
        tdNombre.textContent = dato.nombres;
        tdApellido.textContent = dato.apellidos;
        tdTelefono.textContent = dato.telefono;

        tdAcciones.append(btnEditar, btnEliminar);
        tr.append(tdIdentificacion, tdNombre, tdApellido, tdTelefono, tdAcciones);
        tablaEmpleados.appendChild(tr); 
        
    });

}

// agregar Empleado

const formularioAgregarEmpleado = document.querySelector("#formularioAgregarEmpleado");

formularioAgregarEmpleado.addEventListener('submit',(e)=>{

    e.preventDefault();

    const identificacion = document.querySelector("#identificacionEmpleado").value;
    const nombre = document.querySelector("#nombreEmpleado").value;
    const apellido = document.querySelector("#apellidoEmpleado").value;
    const telefono = document.querySelector("#telefonoEmpleado").value;

    const datos = JSON.stringify({

        identificacion: identificacion,
        nombres: nombre,
        apellidos: apellido,
        telefono: telefono

    });

    fetch(url + "empleado/create.php", {
        method : "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
    })
    .then(response => response.json())
    .then(dato => {

        Swal.fire({
            title: "Agregado!",
            text: "El Empleado se agrego con exito!",
            icon: "success"
        });

        recargar();

    })

})

function editarEmpleado(datos)
{

    document.querySelector("#idEmpleado").value = datos.identificacion;
    document.querySelector("#nombreEmpleadoEditar").value = datos.nombres;
    document.querySelector("#apellidoEmpleadoEditar").value = datos.apellidos;
    document.querySelector("#telefonoEmpleadoEditar").value = datos.telefono;

    const formularioEditarEmpleado = document.querySelector("#formularioEditarEmpleado");

    formularioEditarEmpleado.addEventListener('submit', (e)=>{

        e.preventDefault();

        const identificacion = document.querySelector("#idEmpleado").value;

        const datos = JSON.stringify({

            nombres: document.querySelector("#nombreEmpleadoEditar").value,
            apellidos: document.querySelector("#apellidoEmpleadoEditar").value,
            telefono: document.querySelector("#telefonoEmpleadoEditar").value

        })

        fetch(url + "empleado/update.php?id=" + identificacion, {
        method : "PUT",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
        })
        .then(response => response.json())
        .then(dato => {

            Swal.fire({
            title: "Editado!",
            text: "El Empleado se edito con exito!",
            icon: "success"
        });


        });
        

    })


}

function eliminarEmpleado(datos)
{

    const identificacion = datos.identificacion;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
    if (result.isConfirmed) {
        
        fetch(url+"empleado/delete.php?id="+identificacion,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json" 
            },
        })
        .then(response => response.json())
        .then((dato) => {

         Swal.fire({
            title: "Eliminado!",
            text: "El empleado se elimino con exito!",
            icon: "success"
        });

        recargar();

    })
    }

    });

}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//               --------------------------------------------------------- TAREAS ---------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

function mostrarTareas()
{

    fetch(url + "tareas/get_all.php")
    .then(response => response.json())
    .then((datos) => {
    
        console.log(datos);
        tareasGlobales = datos.data;
        llenarTablaTareas(datos);

    })

}

const tablaTareas = document.querySelector("#tablaTareas");

function llenarTablaTareas(datos)
{

    datos.data.forEach(dato => {

        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdDescripcion = document.createElement("td");
        const tdPrioridad = document.createElement("td");
        const tdAreaID = document.createElement("td");
        const tdAcciones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "me-1");
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute("data-bs-target", "#ModalEditarTarea");
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener('click', ()=>{

            editarTarea(dato);

        });

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.textContent =  "Eliminar";

        btnEliminar.addEventListener('click',()=>{
            eliminarTarea(dato);
        });

        tdID.textContent = dato.id;
        tdDescripcion.textContent = dato.descripcion;
        tdPrioridad.textContent = dato.prioridad;
        tdAreaID.textContent = dato.area_id;

        tdAcciones.append(btnEditar, btnEliminar);
        tr.append(tdID, tdDescripcion, tdPrioridad, tdAreaID, tdAcciones);
        tablaTareas.appendChild(tr); 
        
    });

}

// agregar Tarea

const formularioAgregarTarea = document.querySelector("#formularioAgregarTarea");

formularioAgregarTarea.addEventListener('submit',(e)=>{

    e.preventDefault();

    const descripcion = document.querySelector("#descripcionTarea").value;
    const prioridad = document.querySelector("#prioridadTarea").value;
    const area_id = document.querySelector("#areaIDTarea").value;

    const datos = JSON.stringify({

        descripcion: descripcion,
        prioridad: prioridad,
        area_id: area_id

    });

    fetch(url + "tareas/create.php", {
        method : "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
    })
    .then(response => response.json())
    .then(dato => {

        Swal.fire({
            title: "Agregado!",
            text: "La tarea se agrego con exito!",
            icon: "success"
        });

        recargar();

    })

})

function editarTarea(datos)
{

    document.querySelector("#idTareaEditar").value = datos.id;
    document.querySelector("#descripcionTareaEditar").value = datos.descripcion;
    document.querySelector("#prioridadTareaEditar").value = datos.prioridad;
    document.querySelector("#areaIDTareaEditar").value = datos.area_id;

    const formularioEditarTarea = document.querySelector("#formularioEditarTarea");

    formularioEditarTarea.addEventListener('submit', (e)=>{

        e.preventDefault();

        const idTarea = document.querySelector("#idTareaEditar").value;

        const datos = JSON.stringify({

            descripcion: document.querySelector("#descripcionTareaEditar").value,
            prioridad: document.querySelector("#prioridadTareaEditar").value,
            area_id: document.querySelector("#areaIDTareaEditar").value

        })

        fetch(url + "tareas/update.php?id=" + idTarea, {
        method : "PUT",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
        })
        .then(response => response.json())
        .then(dato => {

            Swal.fire({
            title: "Editado!",
            text: "La tarea se edito con exito!",
            icon: "success"
        });

        recargar()

        });
        

    })


}

function eliminarTarea(datos)
{

    const idTarea = datos.id;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
    if (result.isConfirmed) {
        
        fetch(url+"tareas/delete.php?id="+idTarea,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json" 
            },
        })
        .then(response => response.json())
        .then((dato) => {

         Swal.fire({
            title: "Eliminado!",
            text: "La tarea se elimino con exito!",
            icon: "success"
        });

        recargar();

    })
    }

    });

}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//              --------------------------------------------------------- ESTADOS ---------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

function mostrarEstados()
{

    fetch(url + "estado/get_all.php")
    .then(response => response.json())
    .then((datos) => {
    
        console.log(datos);
        estadosGlobales = datos.data;
        llenarTablaEstados(datos);

    })

}

const tablaEstados = document.querySelector("#tablaEstados");

function llenarTablaEstados(datos)
{

    datos.data.forEach(dato => {

        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdNombre = document.createElement("td");
        const tdAcciones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "me-1");
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute("data-bs-target", "#ModalEditarEstado");
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener('click', ()=>{

            editarEstado(dato);

        });

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.textContent =  "Eliminar";

        btnEliminar.addEventListener('click',()=>{
            eliminarEstado(dato);
        });

        tdID.textContent = dato.id;
        tdNombre.textContent = dato.nombre;

        tdAcciones.append(btnEditar, btnEliminar);
        tr.append(tdID, tdNombre, tdAcciones);
        tablaEstados.appendChild(tr); 
        
    });

}

// agregar Tarea

const formularioAgregarEstado = document.querySelector("#formularioAgregarEstado");

formularioAgregarEstado.addEventListener('submit',(e)=>{

    e.preventDefault();

    const nombre = document.querySelector("#nombreEstado").value;

    const datos = JSON.stringify({

        nombre: nombre

    });

    fetch(url + "estado/create.php", {
        method : "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
    })
    .then(response => response.json())
    .then(dato => {

        Swal.fire({
            title: "Agregado!",
            text: "El estado se agrego con exito!",
            icon: "success"
        });

        recargar();

    })

})

function editarEstado(datos)
{

    document.querySelector("#idEstadoEditar").value = datos.id;
    document.querySelector("#nombreEstadoEditar").value = datos.nombre;

    const formularioEditarEstado = document.querySelector("#formularioEditarEstado");

    formularioEditarEstado.addEventListener('submit', (e)=>{

        e.preventDefault();

        const idEstado = document.querySelector("#idEstadoEditar").value;

        const datos = JSON.stringify({

            nombre: document.querySelector("#nombreEstadoEditar").value,

        })

        fetch(url + "estado/update.php?id=" + idEstado, {
        method : "PUT",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
        })
        .then(response => response.json())
        .then(dato => {

            Swal.fire({
            title: "Editado!",
            text: "El estado se edito con exito!",
            icon: "success"
        });

        recargar()

        });
        

    })


}

function eliminarEstado(datos)
{

    const idEstado = datos.id;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
    if (result.isConfirmed) {
        
        fetch(url+"estado/delete.php?id="+idEstado,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json" 
            },
        })
        .then(response => response.json())
        .then((dato) => {

         Swal.fire({
            title: "Eliminado!",
            text: "El estado se elimino con exito!",
            icon: "success"
        });

        recargar();

    })
    }

    });

}


//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//              --------------------------------------------------------- ASIGNACIONES ---------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

function mostrarAsignaciones()
{

    fetch(url + "asignaciones/get_all.php")
    .then(response => response.json())
    .then((datos) => {
    
        console.log(datos)
        llenarTablaAsignaciones(datos);

    })

}

const tablaAsignacion = document.querySelector("#tablaAsignacion");

function llenarTablaAsignaciones(datos)
{

    datos.data.forEach(dato => {

        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdEmpleadoNombres = document.createElement("td");
        const tdEmpleadoApellidos = document.createElement("td");
        const tdTareaDescripcion = document.createElement("td");
        const tdTareaPrioridad = document.createElement("td");
        const tdFechaAsignacion = document.createElement("td");
        const tdFechaEntrega = document.createElement("td");
        const tdEstadoNombre = document.createElement("td");
        const tdAcciones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "me-1");
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute("data-bs-target", "#ModalEditarAsignacion");
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener('click', ()=>{

            editarAsignacion(dato);

        });

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.textContent =  "Eliminar";

        btnEliminar.addEventListener('click',()=>{
            eliminarAsignacion(dato);
        });

        tdID.textContent = dato.id;
        tdEmpleadoNombres.textContent = dato.empleado_nombres;
        tdEmpleadoApellidos.textContent = dato.empleado_apellidos;
        tdTareaDescripcion.textContent = dato.tarea_descripcion;
        tdTareaPrioridad.textContent = dato.tarea_prioridad;
        tdFechaAsignacion.textContent = dato.fecha_asignacion;
        tdFechaEntrega.textContent = dato.fecha_entrega;
        tdEstadoNombre.textContent = dato.estado_nombre;

        tdAcciones.append(btnEditar, btnEliminar);
        tr.append(tdID, tdEmpleadoNombres, tdEmpleadoApellidos, tdTareaDescripcion, tdTareaPrioridad, tdFechaAsignacion, tdFechaEntrega, tdEstadoNombre, tdAcciones);
        tablaAsignacion.appendChild(tr); 
        
    });

}

// agregar Tarea

const formularioAgregarAsignacion = document.querySelector("#formularioAgregarAsignacion");

formularioAgregarAsignacion.addEventListener('submit',(e)=>{

    e.preventDefault();

    const identificacionEmpleadoAsignacion = document.querySelector("#identificacionEmpleadoAsignacion").value;
    const tareaID = document.querySelector("#tareaID").value;
    const estadoID = document.querySelector("#estadoID").value;
    const fechaAsignacionn = document.querySelector("#fechaAsignacion").value;
    const fechaEntregaa = document.querySelector("#fechaEntrega").value;

    let [fechaAsignacion, horaAsignacion] = fechaAsignacionn.split('T');
    let fechaFormateadaAsignacion = `${fechaAsignacion} ${horaAsignacion}:00`;

    let [fechaEntrega, horaEntrega] = fechaEntregaa.split('T');
    let fechaFormateadaEntrega = `${fechaEntrega} ${horaEntrega}:00`;

    const datos = JSON.stringify({

        empleado_identificacion: identificacionEmpleadoAsignacion,
        tarea_id: tareaID,
        estado_id: estadoID,
        fecha_asignacion: fechaFormateadaAsignacion,  
        fecha_entrega: fechaFormateadaEntrega

    });

    fetch(url + "asignaciones/create.php", {
        method : "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
    })
    .then(response => response.json())
    .then(dato => {

        Swal.fire({
            title: "Agregado!",
            text: "La asigancion se agrego con exito!",
            icon: "success"
        });

        

    })

})

function editarAsignacion(datos)
{

    // se vuelve a poner el formato de datetime-local para poder editar la fecha y hora
    const fechaAsignacion = datos.fecha_asignacion.replace(' ', 'T').slice(0, 16);
    const fechaEntrega = datos.fecha_entrega.replace(' ', 'T').slice(0, 16);

    // se verifica que el empleado este segun la informacion del empleado en la asignacion
    let verificarEmpleado = empleadosGlobales.find(empleado => empleado.nombres === datos.empleado_nombres && empleado.apellidos === datos.empleado_apellidos);
    let verificarTarea = tareasGlobales.find(tarea => tarea.prioridad === datos.tarea_prioridad && tarea.descripcion === datos.tarea_descripcion);
    let verificarEstado = estadosGlobales.find(estado => estado.nombre === datos.estado_nombre);

    document.querySelector("#idAsignacionEditar").value = datos.id;
    document.querySelector("#identificacionEmpleadoAsignacionEditar").value = verificarEmpleado.identificacion;
    document.querySelector("#tareaIDEditar").value = verificarTarea.id;
    document.querySelector("#estadoIDEditar").value = verificarEstado.id;
    document.querySelector("#fechaAsignacionEditar").value = fechaAsignacion;
    document.querySelector("#fechaEntregaEditar").value = fechaEntrega;

    

    const formularioEditarAsignacion = document.querySelector("#formularioEditarAsignacion");

    formularioEditarAsignacion.addEventListener('submit', (e)=>{

        e.preventDefault();

        const idAsignacion = document.querySelector("#idAsignacionEditar").value;
        const fechaAsignacionEditar = document.querySelector("#fechaAsignacionEditar").value;
        const fechaEntregaEditar = document.querySelector("#fechaEntregaEditar").value;

        // se cambia el formato del datetime-local para poder agregarlo a la base de datos
        let [fechaAsignacion, horaAsignacion] = fechaAsignacionEditar.split('T');
        let fechaFormateadaAsignacion = `${fechaAsignacion} ${horaAsignacion}:00`;

        let [fechaEntrega, horaEntrega] = fechaEntregaEditar.split('T');
        let fechaFormateadaEntrega = `${fechaEntrega} ${horaEntrega}:00`;

        const datos = JSON.stringify({

            empleado_identificacion: document.querySelector("#identificacionEmpleadoAsignacionEditar").value,
            tarea_id: document.querySelector("#tareaIDEditar").value,
            estado_id: document.querySelector("#estadoIDEditar").value,
            fecha_asignacion: fechaFormateadaAsignacion,  
            fecha_entrega: fechaFormateadaEntrega

        })

        fetch(url + "asignaciones/update.php?id=" + idAsignacion, {
        method : "PUT",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
        })
        .then(response => response.json())
        .then(dato => {

            Swal.fire({
            title: "Editado!",
            text: "La asignacion se edito con exito!",
            icon: "success"
        });

        recargar()

        });
        

    })


}

function eliminarAsignacion(datos)
{

    const idAsignacion = datos.id;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
    if (result.isConfirmed) {
        
        fetch(url+"asignaciones/delete.php?id="+idAsignacion,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json" 
            },
        })
        .then(response => response.json())
        .then((dato) => {

         Swal.fire({
            title: "Eliminado!",
            text: "La asignacion se elimino con exito!",
            icon: "success"
        });

        recargar();

    })
    }

    });

}


function recargar()
{
    window.location.reload();
}