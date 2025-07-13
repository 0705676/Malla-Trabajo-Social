javascript
// Definición de ramas y requisitos
const ramas = [
    // Primer año
    { id: 'matematicas', nombre: 'Matemáticas', semestre: 1, requisitos: [] },
    { id: 'bases_sociologicas', nombre: 'Bases Sociológicas para el Trabajo Social', semestre: 1, requisitos: [] },
    { id: 'fundamentos_trabajo', nombre: 'Fundamentos del trabajo social', semestre: 1, requisitos: [] },
    { id: 'expresion_oral', nombre: 'Expresión Oral y escrita', semestre: 1, requisitos: [] },
    { id: 'autodesarrollo', nombre: 'Autodesarrollo', semestre: 1, requisitos: [] },

    { id: 'estadistica1', nombre: 'Estadística I', semestre: 2, requisitos: [] },
    { id: 'epistemologia', nombre: 'Epistemología de las ciencias sociales', semestre: 2, requisitos: [] },
    { id: 'trabajo_disciplina', nombre: 'Trabajo social como disciplina y profesión', semestre: 2, requisitos: [] },
    { id: 'antropologia_social', nombre: 'Antropología Social', semestre: 2, requisitos: [] },
    { id: 'psicologia_general', nombre: 'Psicología General', semestre: 2, requisitos: [] },
    { id: 'informatica_basica', nombre: 'Informática Básica', semestre: 2, requisitos: [] },

    // Segundo año
    { id: 'estadistica2', nombre: 'Estadística II', semestre: 3, requisitos: ['estadistica1', 'estudios_poblacion'] },
    { id: 'investigacion_social1', nombre: 'Investigación Social I', semestre: 3, requisitos: ['epistemologia'] },
    { id: 'metodos_intervencion', nombre: 'Métodos de Intervención Profesional en el Trabajo Social', semestre: 3, requisitos: ['trabajo_disciplina'] },
    { id: 'antropologia', nombre: 'Antropología Social', semestre: 3, requisitos: [] },
    { id: 'psicologia_social', nombre: 'Psicología Social', semestre: 3, requisitos: [] },
    { id: 'teoria_sociopolitica', nombre: 'Teoría Socio-política', semestre: 3, requisitos: [] },

    // Tercer año
    { id: 'investigacion_social2', nombre: 'Investigación Social II', semestre: 4, requisitos: ['investigacion_social1'] },
    { id: 'legislacion_social', nombre: 'Legislación Social', semestre: 4, requisitos: [] },
    { id: 'trabajo_comunitario', nombre: 'Trabajo Social en el ámbito comunitario', semestre: 4, requisitos: ['practicas_trabajo_social1'] },
    { id: 'planificacion_social', nombre: 'Planificación Social', semestre: 4, requisitos: ['formulacion_evaluacion', 'indicadores_sociales'] },
    { id: 'estado_politica', nombre: 'Estado y Política Social', semestre: 4, requisitos: ['administracion_gerencia', 'seguridad_social'] },
    { id: 'ingles', nombre: 'Inglés', semestre: 4, requisitos: [] },

    { id: 'investigacion_social3', nombre: 'Investigación Social III', semestre: 5, requisitos: ['investigacion_social2'] },
    { id: 'administracion_gerencia', nombre: 'Administración y Gerencia Social', semestre: 5, requisitos: ['practicas_trabajo_social1'] },
    { id: 'trabajo_ind_familia', nombre: 'Trabajo Social con Individuo y Familia', semestre: 5, requisitos: ['orientacion_familiar'] },
    { id: 'formulacion_proyectos', nombre: 'Formulación y Evaluación de Proyectos Sociales', semestre: 5, requisitos: [] },
    { id: 'indicadores_sociales', nombre: 'Indicadores Sociales', semestre: 5, requisitos: [] },
    { id: 'electiva1', nombre: 'Electiva I', semestre: 5, requisitos: [] },

    // Cuarto año
    { id: 'practicas_trabajo1', nombre: 'Prácticas de Trabajo Social I', semestre: 6, requisitos: ['practicas_trabajo2'] },
    { id: 'seguridad_social', nombre: 'Seguridad Social', semestre: 6, requisitos: [] },
    { id: 'electiva2', nombre: 'Electiva II', semestre: 6, requisitos: [] },

    { id: 'computacion_ciencias', nombre: 'Computación Aplicada a las Ciencias Sociales', semestre: 7, requisitos: [] },
    { id: 'practicas_trabajo2', nombre: 'Prácticas de Trabajo Social II', semestre: 7, requisitos: ['practicas_trabajo3'] },
    { id: 'orientacion_familiar', nombre: 'Orientación Familiar', semestre: 7, requisitos: ['practicas_trabajo3'] },

    // Quinto año
    { id: 'practicas_trabajo3', nombre: 'Prácticas de Trabajo Social III', semestre: 8, requisitos: [] },
    { id: 'trabajo_grado', nombre: 'Trabajo de Grado', semestre: 9, requisitos: [] },
    { id: 'seminario', nombre: 'Seminario Servicio Comunitario', semestre: 9, requisitos: [] },
];

const ramasMap = new Map(ramas.map(r => [r.id, r]));

// Estado de ramas (para controlar si están desbloqueadas o bloqueadas)
const estado = {};

// Función para crear los cuadros interactivos
function crearRamos() {
    const container = document.getElementById('treeContainer');
    ramas.forEach(r => {
        estado[r.id] = false; // inicialmente bloqueadas
        const div = document.createElement('div');
        div.className = 'ramo locked';
        div.id = r.id;
        div.innerText = r.nombre;
        div.onclick = () => {
            if (!estado[r.id]) {
                alert('Este ramo aún no está desbloqueado.');
                return;
            }
            // marcar como completado
            estado[r.id] = false; // para permitir repasar
            div.className = 'ramo unlocked';
            comprobarRequisitos();
        }
        container.appendChild(div);
    });
}

// Función para desbloquear ramas
function desbloquearRamos() {
    ramas.forEach(r => {
        // Comprobar requisitos
        const requisitosCumplidos = r.requisitos.every(reqId => {
            return !estado[reqId]; // si está false, significa completado
        });
        const ramoDiv = document.getElementById(r.id);
        if (requisitosCumplidos) {
            ramoDiv.className = 'ramo unlocked';
            estado[r.id] = true; // desbloqueado
        } else {
            ramoDiv.className = 'ramo locked';
            estado[r.id] = false; // bloqueado
        }
    });
}

// Función para comprobar requisitos y actualizar estado
function comprobarRequisitos() {
    ramas.forEach(r => {
        const ramoDiv = document.getElementById(r.id);
        // Si ya está desbloqueado, no cambiar
        if (ramoDiv.classList.contains('unlocked')) return;
        const requisitosCumplidos = r.requisitos.every(reqId => {
            return !estado[reqId];
        });
        if (requisitosCumplidos) {
            ramoDiv.className = 'ramo unlocked';
            estado[r.id] = true;
        }
    });
}

// Inicializar
crearRamos();
desbloquearRamos();
