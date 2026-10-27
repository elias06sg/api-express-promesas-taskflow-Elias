// js/components/TaskItem.js: Item individual (emite onDeleteTask)
export function TaskItem({ task, onDeleteTask }) {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;

  const span = document.createElement('span');
  span.className = 'task-title';
  span.textContent = task.title;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const badge = document.createElement('span');
  badge.className = `badge ${task.completed ? 'badge-completed' : 'badge-pending'}`;
  badge.textContent = task.completed ? 'Completada' : 'Pendiente';

  const btnDelete = document.createElement('button');
  btnDelete.className = 'btn-delete';
  btnDelete.textContent = 'Eliminar';
  btnDelete.onclick = () => onDeleteTask(task.id); // Callback al padre

  actions.append(badge, btnDelete);
  li.append(span, actions);
  return li;
}
