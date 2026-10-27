// js/components/Header.js: Encabezado de la aplicacion
export function Header({ title, subtitle }) {
  const header = document.createElement('header');
  header.className = 'app-header';

  const h1 = document.createElement('h1');
  h1.textContent = title;

  const p = document.createElement('p');
  p.className = 'app-subtitle';
  p.textContent = subtitle;

  header.append(h1, p);
  return header;
}
