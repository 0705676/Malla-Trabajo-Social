const materias = {
  "I semestre": {
    "Matemáticas": ["Estadística I"],
    "Bases Sociológicas para el Trabajo Social": ["Antropología Social"],
    "Fundamentos del trabajo social": ["Trabajo Social como disciplina y profesión"],
    "Expresión Oral y escrita": [],
    "Autodesarrollo": []
  },
  "II semestre": {
    "Estadística I": ["Estadística II", "Estudios de Población"],
    "Epistemología de las ciencias sociales": ["Investigación Social I"],
    "Trabajo Social como disciplina y profesión": ["Métodos de Intervención Profesional en el Trabajo Social"],
    "Antropología Social": [],
    "Psicología General": ["Psicología Social"],
    "Informática Básica": []
  },
  "III semestre": {
    "Estadística II": ["Investigación Social II"],
    "Investigación Social I": ["Investigación Social II"],
    "Métodos de Intervención Profesional en el Trabajo Social": ["Trabajo Social con Grupo", "Planificación Social"],
    "Ecología Humana": [],
    "Psicología Social": [],
    "Teoría Socio-política": []
  },
  "IV semestre": {
    "Comunicación": [],
    "Estudios de Población": ["Indicadores Sociales"],
    "Trabajo Social con Grupo": ["Trabajo Social en el ámbito comunitario"],
    "Técnicas Grupales": [],
    "Economía Política": ["Estado y Política Social"],
    "Historia Contemporánea de Venezuela": []
  },
  "V semestre": {
    "Investigación Social II": ["Investigación Social III"],
    "Legislación Social": [],
    "Trabajo Social en el ámbito comunitario": ["Prácticas de Trabajo Social I"],
    "Planificación Social": ["Formulación y Evaluación de Proyectos Sociales", "Indicadores Sociales"],
    "Estado y Política Social": ["Administración y Gerencia Social", "Seguridad Social"],
    "Inglés": []
  },
  "VI semestre": {
    "Investigación Social III": ["Computación Aplicada a las Ciencias Sociales"],
    "Administración y Gerencia Social": ["Prácticas de Trabajo Social I"],
    "Trabajo Social con Individuo y Familia": ["Orientación Familiar"],
    "Formulación y Evaluación de Proyectos Sociales": [],
    "Indicadores Sociales": [],
    "Electiva I": []
  },
  "VII semestre": {
    "Prácticas de Trabajo Social I": ["Prácticas de Trabajo Social II"],
    "Seguridad Social": [],
    "Electiva II": []
  },
  "VIII semestre": {
    "Computación Aplicada a las Ciencias Sociales": [],
    "Prácticas de Trabajo Social II": ["Prácticas de Trabajo Social III"],
    "Orientación Familiar": ["Prácticas de Trabajo Social III"]
  },
  "IX semestre": {
    "Prácticas de Trabajo Social III": []
  },
  "X semestre": {
    "Trabajo de Grado": [],
    "Seminario Servicio Comunitario": []
  }
};

// 🔎 Detectar qué materias están bloqueadas hasta que otra las desbloquee
function materiasBloqueadas() {
  const bloqueadas = new Set();

  for (let semestre in materias) {
    for (let materia in materias[semestre]) {
      for (let desbloquea of materias[semestre][materia]) {
        bloqueadas.add(desbloquea);
      }
    }
  }
  return bloqueadas;
}

const bloqueadas = materiasBloqueadas();
const mallaDiv = document.getElementById('malla');
const checkboxes = {};

function guardarEstado(nombre, estado) {
  localStorage.setItem(nombre, estado);
}

function cargarEstado(nombre) {
  return localStorage.getItem(nombre) === 'true';
}

function puedeSerActivada(materia) {
  // Si no está bloqueada, se puede activar directamente
  if (!bloqueadas.has(materia)) return true;

  for (let semestre in materias) {
    for (let origen in materias[semestre]) {
      if (materias[semestre][origen].includes(materia)) {
        if (!cargarEstado(origen)) return false;
      }
    }
  }
  return true;
}

function crearMalla() {
  for (let semestre in materias) {
    const contenedor = document.createElement('div');
    contenedor.className = 'semestre';

    const titulo = document.createElement('h2');
    titulo.textContent = semestre;
    contenedor.appendChild(titulo);

    const grid = document.createElement('div');
    grid.className = 'materias';

    for (let materia in materias[semestre]) {
      const card = document.createElement('div');
      card.className = 'materia';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = materia;
      checkbox.checked = cargarEstado(materia);
      checkbox.disabled = !checkbox.checked && !puedeSerActivada(materia);
      checkbox.addEventListener('change', () => {
        guardarEstado(materia, checkbox.checked);
        actualizarDisponibilidad();
      });

      const label = document.createElement('label');
      label.setAttribute('for', materia);
      label.textContent = materia;

      card.appendChild(checkbox);
      card.appendChild(label);

      grid.appendChild(card);
      checkboxes[materia] = { element: card, checkbox };
    }

    contenedor.appendChild(grid);
    mallaDiv.appendChild(contenedor);
  }
}

function actualizarDisponibilidad() {
  for (let nombre in checkboxes) {
    const { element, checkbox } = checkboxes[nombre];
    checkbox.disabled = !checkbox.checked && !puedeSerActivada(nombre);
    element.classList.toggle("disabled", checkbox.disabled && !checkbox.checked);
  }
}

function resetearMalla() {
  localStorage.clear();
  location.reload();
}

crearMalla();
actualizarDisponibilidad();
