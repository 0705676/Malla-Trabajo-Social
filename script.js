const materias = {
  "I semestre": {
    "Matemáticas": ["Estadística I"],
    "Bases Sociológicas para el Trabajo Social": ["Antropología Social"],
    "Fundamentos del trabajo social": ["Trabajo Social como disciplina y profesión"],
    "Expresión Oral y escrita": [],
    "Autodesarrollo": []
  },
  "II semestre": {
    "Estadística I": ["Estadística II","Estudios de Población"],
    "Epistemología de las ciencias sociales": ["Investigación Social I"],
    "Trabajo Social como disciplina y profesión": ["Métodos de Intervención Profesional en el Trabajo Social"],
    "Antropología Social": [],
    "Psicología General": ["Psicología Social"],
    "Informática Básica": []
  },
  "III semestre": {
    "Estadística II": ["Investigación Social II"],
    "Investigación Social I": ["Investigación Social II"],
    "Métodos de Intervención Profesional en el Trabajo Social": ["Trabajo Social con Grupo","Planificación Social"],
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
    "Planificación Social": ["Formulación y Evaluación de Proyectos Sociales","Indicadores Sociales"],
    "Estado y Política Social": ["Administración y Gerencia Social","Seguridad Social"],
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

const bloqueadasPorDefecto = (() => {
  const set = new Set();
  for (let sem in materias) {
    for (let m in materias[sem]) {
      materias[sem][m].forEach(dep => set.add(dep));
    }
  }
  return set;
})();

const estado = {};
const cajas = {};

function guardar(name, val) {
  localStorage.setItem(name, val);
}

function leer(name) {
  return localStorage.getItem(name) === 'true';
}

function sePuede(materia) {
  if (!bloqueadasPorDefecto.has(materia)) return true;
  for (let s in materias)
    for (let o in materias[s])
      if (materias[s][o].includes(materia) && !estado[o]) return false;
  return true;
}

function crear() {
  const root = document.getElementById('malla');
  for (let sem in materias) {
    const divS = document.createElement('div');
    divS.className = 'semestre';
    const t = document.createElement('h2'); t.textContent = sem;
    divS.appendChild(t);

    const gm = document.createElement('div');
    gm.className = 'materias';

    Object.keys(materias[sem]).forEach(mat => {
      const card = document.createElement('div');
      card.className = 'materia';

      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.checked = leer(mat);
      estado[mat] = chk.checked;

      const possible = sePuede(mat);
      if (!possible && !chk.checked) card.classList.add('bloqueada');
      if (chk.checked) card.classList.add('aprobada');

      chk.disabled = !possible && !chk.checked;
      chk.addEventListener('change', () => {
        estado[mat] = chk.checked;
        guardar(mat, chk.checked);
        actualizar();
      });

      const lbl = document.createElement('label');
      lbl.htmlFor = mat;
      lbl.textContent = mat;

      card.append(chk, lbl);
      gm.appendChild(card);
      cajas[mat] = { card, chk };
    });

    divS.appendChild(gm);
    root.appendChild(divS);
  }
}

function actualizar() {
  Object.entries(cajas).forEach(([mat, {card, chk}]) => {
    const can = sePuede(mat);
    card.classList.toggle('bloqueada', !can && !chk.checked);
    card.classList.toggle('aprobada', chk.checked);
    chk.disabled = !can && !chk.checked;
  });
}

function resetearMalla() {
  localStorage.clear();
  location.reload();
}

crear();
actualizar();
