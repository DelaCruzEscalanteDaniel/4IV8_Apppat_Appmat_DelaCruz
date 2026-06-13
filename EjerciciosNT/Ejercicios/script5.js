function calcularPorcentajes() {
  const total = parseFloat(document.getElementById('total').value);
  const hombres = parseFloat(document.getElementById('hombres').value) || 0;
  const error = document.getElementById('error');
  const result = document.getElementById('result');

  error.textContent = '';
  result.textContent = '';

  if (isNaN(total) || total <= 0) {
    error.textContent = 'El total de estudiantes debe ser mayor a 0.';
    return;
  }
  if (hombres > total) {
    error.textContent = 'El número de hombres no puede ser mayor al total.';
    return;
  }

  const mujeres = total - hombres;
  const porcH = (hombres / total) * 100;
  const porcM = (mujeres / total) * 100;

  result.innerHTML = `
    Hombres: <strong>${porcH.toFixed(1)}%</strong><br>
    Mujeres: <strong>${porcM.toFixed(1)}%</strong>
  `;
}