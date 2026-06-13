function calcularComisiones() {
  const sueldo = parseFloat(document.getElementById('sueldo').value);
  const v1 = parseFloat(document.getElementById('v1').value) || 0;
  const v2 = parseFloat(document.getElementById('v2').value) || 0;
  const v3 = parseFloat(document.getElementById('v3').value) || 0;
  const error = document.getElementById('error');
  const result = document.getElementById('result');

  error.textContent = '';
  result.textContent = '';

  if (isNaN(sueldo) || sueldo < 0) {
    error.textContent = 'Ingresa un sueldo base válido.';
    return;
  }

  const totalVentas = v1 + v2 + v3;
  const comision = totalVentas * 0.10;
  const total = sueldo + comision;

  result.innerHTML = `
    Total ventas: $${totalVentas.toFixed(2)}<br>
    Comisión (10%): $${comision.toFixed(2)}<br>
    <strong>Sueldo total: $${total.toFixed(2)}</strong>
  `;
}