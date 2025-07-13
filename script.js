<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Malla Interactiva - Trabajo Social</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <header><h1>Malla Interactiva - Trabajo Social</h1></header>
  <main>
    <!-- Primer Año -->
    <section>
      <h2>Primer Año</h2>
      <div class="semestre">
        <h3>I Semestre</h3>
        <div class="ramo" id="matematicas" data-requiere="none">Matemáticas</div>
        <div class="ramo" id="bases-sociologicas" data-requiere="none">Bases Sociológicas</div>
        <div class="ramo" id="fundamentos-trabajo-social" data-requiere="none">Fundamentos del TS</div>
        <div class="ramo" id="expresion-oral" data-requiere="none">Expresión Oral y Escrita</div>
        <div class="ramo" id="autodesarrollo" data-requiere="none">Autodesarrollo</div>
      </div>
      <div class="semestre">
        <h3>II Semestre</h3>
        <div class="ramo" id="estadistica-I" data-requiere="matematicas">Estadística I</div>
        <div class="ramo" id="epistemologia" data-requiere="bases-sociologicas">Epistemología</div>
        <div class="ramo" id="trabajo-social" data-requiere="fundamentos-trabajo-social">TS como disciplina</div>
        <div class="ramo" id="antropologia" data-requiere="bases-sociologicas">Antropología Social</div>
        <div class="ramo" id="psicologia-general" data-requiere="none">Psicología General</div>
        <div class="ramo" id="informatica" data-requiere="none">Informática Básica</div>
      </div>
    </section>

    <!-- Segundo Año -->
    <section>
      <h2>Segundo Año</h2>
      <div class="semestre">
        <h3>III Semestre</h3>
        <div class="ramo" id="estadistica-II" data-requiere="estadistica-I">Estadística II</div>
        <div class="ramo" id="investigacion-social-I" data-requiere="epistemologia">Investigación Social I</div>
        <div class="ramo" id="metodos-intervencion" data-requiere="trabajo-social">Métodos de Intervención</div>
        <div class="ramo" id="ecologia-humana" data-requiere="none">Ecología Humana</div>
        <div class="ramo" id="psicologia-social" data-requiere="psicologia-general">Psicología Social</div>
        <div class="ramo" id="teoria-socio-politica" data-requiere="none">Teoría Socio-Política</div>
      </div>
      <div class="semestre">
        <h3>IV Semestre</h3>
        <div class="ramo" id="comunicacion" data-requiere="none">Comunicación</div>
        <div class="ramo" id="estudios-poblacion" data-requiere="estadistica-I">Estudios de Población</div>
        <div class="ramo" id="ts-grupo" data-requiere="metodos-intervencion">TS con Grupo</div>
        <div class="ramo" id="tecnicas-grupales" data-requiere="none">Técnicas Grupales</div>
        <div class="ramo" id="economia-politica" data-requiere="none">Economía Política</div>
        <div class="ramo" id="historia-vzla" data-requiere="none">Historia Contemp. de Venezuela</div>
      </div>
    </section>

    <!-- Tercer Año -->
    <section>
      <h2>Tercer Año</h2>
      <div class="semestre">
        <h3>V Semestre</h3>
        <div class="ramo" id="investigacion-social-II" data-requiere="estadistica-II,investigacion-social-I">Investigación Social II</div>
        <div class="ramo" id="legislacion-social" data-requiere="none">Legislación Social</div>
        <div class="ramo" id="ts-comunidad" data-requiere="ts-grupo">TS en Comunidad</div>
        <div class="ramo" id="planificacion-social" data-requiere="metodos-intervencion">Planificación Social</div>
        <div class="ramo" id="estado-politica-social" data-requiere="economia-politica">Estado y Política Social</div>
        <div class="ramo" id="ingles" data-requiere="none">Inglés</div>
      </div>
      <div class="semestre">
        <h3>VI Semestre</h3>
        <div class="ramo" id="investigacion-social-III" data-requiere="investigacion-social-II">Investigación Social III</div>
        <div class="ramo" id="administracion-social" data-requiere="estado-politica-social">Administración y Gerencia Social</div>
        <div class="ramo" id="ts-familia" data-requiere="none">TS con Individuo y Familia</div>
        <div class="ramo" id="formulacion-proyectos" data-requiere="planificacion-social">Formulación y Evaluación de Proyectos</div>
        <div class="ramo" id="indicadores-sociales" data-requiere="estudios-poblacion">Indicadores Sociales</div>
        <div class="ramo" id="electiva-I" data-requiere="none">Electiva I</div>
      </div>
    </section>

    <!-- Cuarto Año -->
    <section>
      <h2>Cuarto Año</h2>
      <div class="semestre">
        <h3>VII Semestre</h3>
        <div class="ramo" id="practicas-I" data-requiere="ts-comunidad">Prácticas TS I</div>
        <div class="ramo" id="seguridad-social" data-requiere="estado-politica-social">Seguridad Social</div>
        <div class="ramo" id="electiva-II" data-requiere="none">Electiva II</div>
      </div>
      <div class="semestre">
        <h3>VIII Semestre</h3>
        <div class="ramo" id="computacion-sociales" data-requiere="investigacion-social-III">Computación Aplicada</div>
        <div class="ramo" id="practicas-II" data-requiere="practicas-I">Prácticas TS II</div>
        <div class="ramo" id="orientacion-familiar" data-requiere="ts-familia">Orientación Familiar</div>
      </div>
    </section>

    <!-- Quinto Año -->
    <section>
      <h2>Quinto Año</h2>
      <div class="semestre">
        <h3>IX Semestre</h3>
        <div class="ramo" id="practicas-III" data-requiere="practicas-II,orientacion-familiar">Prácticas TS III</div>
      </div>
      <div class="semestre">
        <h3>X Semestre</h3>
        <div class="ramo" id="trabajo-grado" data-requiere="investigacion-social-III">Trabajo de Grado</div>
        <div class="ramo" id="seminario-comunitario" data-requiere="ts-comunidad">Seminario Servicio Comunitario</div>
      </div>
    </section>
  </main>
  <script src="script.js"></script>
</body>
</html>
