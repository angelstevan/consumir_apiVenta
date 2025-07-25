
const url = "https://apiguarin.proyectosadso.com/api/";

document.addEventListener('DOMContentLoaded', mostrarEmpleados());

function mostrarEmpleados()
{

    fetch(url + "empleado/get_all.php")
    .then(response => response.json())
    .then((datos) => {
    
        console.log(datos);
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

function recargar()
{
    window.location.reload();
}