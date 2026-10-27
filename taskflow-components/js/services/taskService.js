// js/services/taskService.js: Capa de comunicacion asincrona con la API
const API_URL = 'http://localhost:3001/api/tasks';

/**
 * 1. GET: Retorna una Promesa que resuelve en el array de tareas
 */
export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Fallo al consultar tareas. Codigo HTTP: ${response.status}`);
  }
  return await response.json(); // Segunda Promesa: deserializa JSON
}

/**
 * 2. POST: Retorna una Promesa que resuelve en el nuevo objeto tarea
 */
export async function createTask(title) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title })
  });
  if (!response.ok) {
    throw new Error(`Fallo al crear la tarea. Codigo HTTP: ${response.status}`);
  }
  return await response.json();
}

/**
 * 3. DELETE: Retorna una Promesa que confirma la eliminacion
 */
export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(`Fallo al eliminar la tarea. Codigo HTTP: ${response.status}`);
  }
  return await response.json();
}
