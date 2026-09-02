let historial = [];

const operaciones = {
    suma: (a, b) => a + b,
    resta: (a, b) => a - b,
    multiplicacion: (a, b) => a * b,
    division: (a, b) => a / b
};

const simbolos = {
    suma: '+',
    resta: '−',
    multiplicacion: '×',
    division: '÷'
};

const validar = (n1, n2, operacion) => {
    if (Number.isNaN(n1) || Number.isNaN(n2)) {
        return 'Ambos campos deben ser números válidos.';
    }
    if (operacion === 'division' && n2 === 0) {
        return 'No se puede dividir entre cero.';
    }
    return null;
};

const mostrarResultado = (mensaje, esError) => {
    const $resultado = $('#resultado');
    $resultado
        .text(mensaje)
        .removeClass('ok error')
        .addClass(esError ? 'error' : 'ok');
};

const agregarAlHistorial = texto => {
    historial.unshift(texto);

    localStorage.setItem('historial-calculadora', JSON.stringify(historial));

    renderizarHistorial();

    console.log('Estado del historial:', historial);
};

const renderizarHistorial = () => {
    const $lista = $('#historial');
    $lista.empty();

    historial.forEach(texto => {
        $lista.append(`<li>${texto}</li>`);
    });
};

$(document).ready(() => {
    $('#form-calculadora').on('submit', evento => {
        evento.preventDefault();

        const n1 = parseFloat($('#numero1').val());
        const n2 = parseFloat($('#numero2').val());
        const operacion = $('#operacion').val();

        console.log(`Operación solicitada: ${operacion} — Entradas: ${n1}, ${n2}`);

        const errorValidacion = validar(n1, n2, operacion);

        if (errorValidacion) {
            console.log('Error:', errorValidacion);
            mostrarResultado(errorValidacion, true);
            return;
        }

        const resultado = operaciones[operacion](n1, n2);
        const { [operacion]: simbolo } = simbolos;
        const textoResultado = `${n1} ${simbolo} ${n2} = ${resultado}`;

        console.log('Resultado:', textoResultado);

        mostrarResultado(textoResultado, false);
        agregarAlHistorial(textoResultado);
    });

    const historialGuardado = localStorage.getItem('historial-calculadora');

    if (historialGuardado) {
        historial = JSON.parse(historialGuardado);
        renderizarHistorial();
        console.log('Historial recuperado de localStorage:', historial);
    }
});
