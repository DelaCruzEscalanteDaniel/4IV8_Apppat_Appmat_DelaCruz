function calcularEdad() {
  const anioNacimiento = parseInt(document.getElementById('anio').value);
  const error = document.getElementById('error');
  const result = document.getElementById('result');

  error.textContent = '';
  result.textContent = '';

  const anioActual = 2026;

  if (isNaN(anioNacimiento) || anioNacimiento < 1900 || anioNacimiento > anioActual) {
    error.textContent = 'Ingresa un año válido entre 1900 y 2026.';
    return;
  }

  const edad = anioActual - anioNacimiento;

  result.innerHTML = `<strong>La persona tiene ${edad} años de edad.</strong>`;
}