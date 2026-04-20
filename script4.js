function calcularCalificacion() {
  const p1 = parseFloat(document.getElementById('p1').value) || 0;
  const p2 = parseFloat(document.getElementById('p2').value) || 0;
  const p3 = parseFloat(document.getElementById('p3').value) || 0;
  const examen = parseFloat(document.getElementById('examen').value) || 0;
  const trabajo = parseFloat(document.getElementById('trabajo').value) || 0;

  const error = document.getElementById('error');
  const result = document.getElementById('result');

  error.textContent = '';

  if (p1 > 100 || p2 > 100 || p3 > 100 || examen > 100 || trabajo > 100) {
    error.textContent = 'Las calificaciones no pueden ser mayores a 100.';
    return;
  }

  const promParciales = (p1 + p2 + p3) / 3;
  const final = (promParciales * 0.55) + (examen * 0.30) + (trabajo * 0.15);

  result.innerHTML = `<strong>Calificación Final: ${final.toFixed(2)}</strong>`;
}