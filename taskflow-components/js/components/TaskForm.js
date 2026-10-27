// js/components/TaskForm.js: Formulario de creacion (emite onAddTask)
export function TaskForm({ onAddTask, disabled }) {
  const form = document.createElement('form');
  form.className = 'task-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Escribe una nueva tarea...';
  input.required = true;
  input.disabled = Boolean(disabled);

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'btn-add';
  button.textContent = 'Agregar Tarea';
  button.disabled = Boolean(disabled);

  form.append(input, button);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    onAddTask(value); // Callback al componente padre (App)
    input.value = '';
  });

  return form;
}
