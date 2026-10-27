// js/components/ErrorAlert.js: Muestra el estado REJECTED de la Promesa
export function ErrorAlert({ message, onRetry }) {
  const alert = document.createElement('div');
  alert.className = 'error-alert';

  const text = document.createElement('span');
  text.textContent = message;
  alert.appendChild(text);

  if (onRetry) {
    const btnRetry = document.createElement('button');
    btnRetry.className = 'btn-retry';
    btnRetry.textContent = 'Reintentar';
    btnRetry.onclick = onRetry;
    alert.appendChild(btnRetry);
  }

  return alert;
}
