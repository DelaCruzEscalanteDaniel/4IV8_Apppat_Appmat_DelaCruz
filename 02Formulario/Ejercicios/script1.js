function calcularInteres() {
  const capital = document.getElementById('capital').value;
  const error = document.getElementById('error');
  const result = document.getElementById('result');

  error.textContent = '';
  result.textContent = '';

  if (capital === '' || isNaN(capital) || parseFloat(capital) <= 0) {
    error.textContent = 'Por favor ingresa un capital válido mayor a 0.';
    return;
  }

  const interes = parseFloat(capital) * 0.02;
  const total = parseFloat(capital) + interes;

  result.innerHTML = `
    <strong>Resultado:</strong><br>
    Interés: $${interes.toFixed(2)}<br>
    Total después de 1 mes: <strong>$${total.toFixed(2)}</strong>
  `;
}