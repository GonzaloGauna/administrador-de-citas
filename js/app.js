const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario');
const contenedorCitas = document.querySelector('#contenedorCitas');

class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

}
class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('mensajeAlerta');

        if( tipo === 'error' ) {
            divMensaje.classList.add('mensajeAlerta-error');
        }

        divMensaje.textContent = mensaje;
        document.querySelector('#contenedor-formulario').insertBefore(divMensaje, document.querySelector('#formulario'));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
    imprimirCitas({citas}) {
        this.limpiarHTML()

        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita');
            divCita.dataset.id = id;

            const mascotaTexto = document.createElement('h2');
            mascotaTexto.classList.add('cita-tittle');
            mascotaTexto.textContent = mascota;

            const propietarioTexto = document.createElement('p');
            propietarioTexto.classList.add('cita-parrafo');
            propietarioTexto.innerHTML = `
                <span>Propietario</span>: ${propietario}
            `;
            const telefonoTexto = document.createElement('p');
            telefonoTexto.classList.add('cita-parrafo');
            telefonoTexto.innerHTML = `
                <span>Telefono</span>: ${telefono}
            `;
            const fechaTexto = document.createElement('p');
            fechaTexto.classList.add('cita-parrafo');
            fechaTexto.innerHTML = `
                <span>Fecha</span>: ${fecha}
            `;
            const horaTexto = document.createElement('p');
            horaTexto.classList.add('cita-parrafo');
            horaTexto.innerHTML = `
                <span>Hora</span>: ${hora}
            `;
            const sintomasTexto = document.createElement('p');
            sintomasTexto.classList.add('cita-parrafo');
            sintomasTexto.innerHTML = `
                <span>Sintomas</span>: ${sintomas}
            `;

            divCita.appendChild(mascotaTexto);
            divCita.appendChild(propietarioTexto);
            divCita.appendChild(telefonoTexto);
            divCita.appendChild(fechaTexto);
            divCita.appendChild(horaTexto);
            divCita.appendChild(sintomasTexto);
            contenedorCitas.appendChild(divCita);
        });
    }
    limpiarHTML() {
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const administrarCitas = new Citas();
const ui = new UI();

eventlisteners();
function eventlisteners(){
    inputMascota.addEventListener('input', datosCita);
    inputPropietario.addEventListener('input', datosCita);
    inputTelefono.addEventListener('input', datosCita);
    inputFecha.addEventListener('input', datosCita);
    inputHora.addEventListener('input', datosCita);
    inputSintomas.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}
function nuevaCita(e) {
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatorios!', 'error');
        
        return;
    }

    citaObj.id = Date.now();

    administrarCitas.agregarCita({...citaObj});

    reiniciarObj();

    formulario.reset();

    ui.imprimirCitas(administrarCitas);
}
function reiniciarObj() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}