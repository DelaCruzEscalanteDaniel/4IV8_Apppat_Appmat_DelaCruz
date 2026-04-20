function calcularDescuento() {
  const total = parseFloat(document.getElementById('compra').value);
  const error = document.getElementById('error');
  const result = document.getElementById('result');

  error.textContent = '';
  result.textContent = '';

  if (isNaN(total) || total <= 0) {
    error.textContent = 'Ingresa un monto válido mayor a 0.';
    return;
  }

  const descuento = total * 0.15;
  const final = total - descuento;

  result.innerHTML = `
    Descuento: $${descuento.toFixed(2)}<br>
    <strong>Precio final: $${final.toFixed(2)}</strong>
  `;
}