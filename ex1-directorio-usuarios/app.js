// Requisitos mínimos:
// • Cargar usuarios con axios usando async/await.
// • Usar arrow functions en callbacks/eventos y métodos de arreglo. (LIST)

// Criterios de aceptación:
// • Muestra 10 usuarios.
// • Filtro funciona sin recargar la página.
// • Detalle abre y cierra correctamente.
// • Código con ES6 (const/let, arrow, templates, async/await).
// • Consola con logs claros de carga, filtro y selección

let usuarios = [];

async function cargarUsuarios() {
    try {
        let respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');

        usuarios = respuesta.data.map(usuario => ({
            nombre: usuario.name,
            email: usuario.email,
            telefono: usuario.phone,
            direccion: `${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}, ${usuario.address.zipcode}`,
            empresa: usuario.company.name
        }));

        console.log(`Usuarios cargados: ${usuarios.length}`);
        console.log(`Primera fila: ${usuarios[0].nombre}, ${usuarios[0].email}, ${usuarios[0].empresa}`);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

// • Imprimir en consola:
// o Resumen de usuarios cargados (cantidad y primera fila).
// o Término usado en el filtro y cantidad de coincidencias.
// o Detalle del usuario cuando se hace clic.
function imprimirConsola() {
    console.log(
        `Usuarios cargados: ${JSON.stringify(usuarios)}, \n\nCantidad: ${usuarios.length}, \n\nPrimera Fila: ${usuarios[0].nombre}, ${usuarios[0].email}, ${usuarios[0].empresa}`
    );
}

$(document).ready(async function () {
    await cargarUsuarios();
    imprimirConsola();

    // • Renderizar una tabla con jQuery: Nombre, Email, Empresa. (LISTO)
    $('#contenidoTabla').html(
        usuarios.map(
            usuario => `
                <tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.empresa}</td>
                </tr>
            `
        ).join('')
    );

    // • Filtro en vivo por nombre (input de texto). (LISTO)
    $('#filtroNombre').on('input', function () {
        let textoCopiado = $(this).val().toLowerCase();
        let coincidencias = usuarios.filter(usuario =>
            usuario.nombre.toLowerCase().includes(textoCopiado)
        );

        console.log(`Texto: ${textoCopiado}, Conincidencia: ${coincidencias.length}`);

        $('#contenidoTabla').html(
            coincidencias.map(
                usuario => `
                    <tr>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.empresa}</td>
                    </tr>
                `
            ).join('')
        );
    });

    // Al hacer clic en un usuario, mostrar detalle (teléfono y dirección).
    $('#contenidoTabla').on('click', 'tr', function () {
        let informacionUsuario = $(this).find('td').eq(0).text();
        let usuarioSeleccionado = usuarios.find(
            usuario => usuario.nombre === informacionUsuario
        );

        $('#modalInfoUsuario').show();
        $('#modalInfoUsuario .modal-body').html(`
            <p><strong>Teléfono:</strong> ${usuarioSeleccionado.telefono}</p>
            <p><strong>Dirección:</strong> ${usuarioSeleccionado.direccion}</p>
        `);
    });

    $('.btn-close').on('click', function () {
        $('#modalInfoUsuario').hide();
    });
});