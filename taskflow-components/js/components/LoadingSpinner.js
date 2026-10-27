// js/components/LoadingSpinner.js: Muestra el estado PENDING de la Promesa
export function LoadingSpinner({ message = 'Consultando API remota...' }) {
  const container = document.createElement('div');
  container.className = 'loading-container';

  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  const span = document.createElement('span');
  span.textContent = message;

  container.append(spinner, span);
  return container;
}
