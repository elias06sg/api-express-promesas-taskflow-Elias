// js/components/App.js: Componente Raiz con Estado y Orquestacion
import { getTasks, createTask, deleteTask } from '../services/taskService.js';
import { Header } from './Header.js';
import { TaskForm } from './TaskForm.js';
import { TaskList } from './TaskList.js';
import { LoadingSpinner } from './LoadingSpinner.js';
import { ErrorAlert } from './ErrorAlert.js';

export function App() {
  const container = document.createElement('main');
  container.className = 'app-container';

  // 1. Estado centralizado de la aplicacion
  const state = {
    tasks: [],
    loading: false,
    loadingMessage: '',
    error: null
  };

  // 2. Funcion de renderizado dinamico (construye el DOM segun el estado actual)
  function render() {
    container.innerHTML = ''; // Limpia el arbol anterior para redibujar

    // Encabezado
    container.appendChild(Header({
      title: 'TaskFlow Components',
      subtitle: 'Arquitectura de Componentes en Vanilla JS y Promesas (GET, POST, DELETE)'
    }));

    // Formulario de Creacion (POST)
    container.appendChild(TaskForm({
      disabled: state.loading,
      onAddTask: handleAddTask
    }));

    // Indicador de Carga (Estado PENDING)
    if (state.loading) {
      container.appendChild(LoadingSpinner({ message: state.loadingMessage }));
    }

    // Alerta de Error (Estado REJECTED)
    if (state.error) {
      container.appendChild(ErrorAlert({
        message: state.error,
        onRetry: handleLoadTasks
      }));
    }

    // Boton de refresco manual
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'btn-refresh';
    refreshBtn.textContent = 'Refrescar Lista desde API';
    refreshBtn.disabled = state.loading;
    refreshBtn.onclick = handleLoadTasks;
    container.appendChild(refreshBtn);

    // Lista de Tareas (Estado FULFILLED)
    container.appendChild(TaskList({
      tasks: state.tasks,
      onDeleteTask: handleDeleteTask
    }));
  }

  // 3. Manejadores Asincronos de Eventos (Consumo de Promesas)
  async function handleLoadTasks() {
    state.loading = true;
    state.loadingMessage = 'Consultando API remota... (Estado: PENDING)';
    state.error = null;
    render();

    try {
      state.tasks = await getTasks(); // Promesa GET resuelta (FULFILLED)
    } catch (err) {
      state.error = `Error al consultar la API: ${err.message}. Verifica el servidor en el puerto 3001.`;
    } finally {
      state.loading = false;
      render();
    }
  }

  async function handleAddTask(title) {
    state.loading = true;
    state.loadingMessage = `Guardando "${title}" en la API... (Estado: PENDING)`;
    state.error = null;
    render();

    try {
      const nueva = await createTask(title); // Promesa POST resuelta (FULFILLED)
      state.tasks.push(nueva);
    } catch (err) {
      state.error = `Error al crear tarea: ${err.message}`;
    } finally {
      state.loading = false;
      render();
    }
  }

  async function handleDeleteTask(id) {
    state.loading = true;
    state.loadingMessage = `Eliminando tarea ID ${id}... (Estado: PENDING)`;
    state.error = null;
    render();

    try {
      await deleteTask(id); // Promesa DELETE resuelta (FULFILLED)
      state.tasks = state.tasks.filter((t) => String(t.id) !== String(id));
    } catch (err) {
      state.error = `Error al eliminar tarea: ${err.message}`;
    } finally {
      state.loading = false;
      render();
    }
  }

  // Carga inicial automatica de datos
  handleLoadTasks();

  return container;
}
