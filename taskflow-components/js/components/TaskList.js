// js/components/TaskList.js: Lista de tareas
import { TaskItem } from './TaskItem.js';

export function TaskList({ tasks, onDeleteTask }) {
  const ul = document.createElement('ul');
  ul.className = 'task-list';

  if (!tasks || tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-message';
    empty.textContent = 'No hay tareas registradas en la API.';
    ul.appendChild(empty);
    return ul;
  }

  tasks.forEach((task) => {
    ul.appendChild(TaskItem({ task, onDeleteTask }));
  });

  return ul;
}
