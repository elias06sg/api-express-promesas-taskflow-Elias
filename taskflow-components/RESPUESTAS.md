# Cuestionario de Análisis Conceptual — Taller TaskFlow Components

## 1. Arquitectura de Componentes frente a HTML tradicional

Tener un `index.html` que solo contiene `<div id="root"></div>` convierte al HTML en un simple punto de montaje: toda la interfaz se describe en JavaScript como funciones que reciben *props* y devuelven nodos del DOM. Ventajas:

- **Modularidad:** cada pieza visual (`Header`, `TaskForm`, `TaskItem`, `TaskList`, `LoadingSpinner`, `ErrorAlert`) vive en su propio archivo con una única responsabilidad, y se puede reutilizar (p. ej. `TaskItem` se instancia una vez por tarea).
- **Interfaz derivada del estado:** la vista es una función del estado (`render()` en `App`). No hay que sincronizar a mano elementos estáticos del HTML con los datos; basta con cambiar el estado y volver a renderizar.
- **Depuración:** si algo falla en un ítem, se revisa `TaskItem.js`; si falla la red, `taskService.js`. El error queda acotado a un módulo pequeño, en lugar de buscarlo dentro de un script monolítico con selectores y listeners mezclados.
- **Mantenimiento y escalabilidad:** agregar una funcionalidad es crear un nuevo componente y componerlo en `App`, sin tocar el HTML ni romper el resto. Además, usar `createElement` + `textContent` evita inyección de HTML (XSS) con los títulos que vienen de la API.

## 2. Flujo Unidireccional de Datos (Props y Callbacks)

- **¿Cómo recibe `TaskItem` la información?** Por *props* hacia abajo: `App` guarda `state.tasks` y llama a `TaskList({ tasks: state.tasks, onDeleteTask: handleDeleteTask })`; `TaskList` recorre el array y llama a `TaskItem({ task, onDeleteTask })` para cada elemento. `TaskItem` solo lee `task.title`, `task.completed` y `task.id`; nunca modifica el estado.
- **¿Cómo avisa `TaskItem` a `App` que se presionó "Eliminar"?** Por *callback* hacia arriba: `App` le entrega la función `handleDeleteTask` como prop `onDeleteTask` (pasando por `TaskList`). El botón del ítem ejecuta `onDeleteTask(task.id)`, lo que invoca el manejador de `App`. `App` llama a `deleteTask(id)` del servicio, actualiza `state.tasks` y vuelve a renderizar. Los datos bajan y los eventos suben: el estado tiene una sola fuente de verdad (`App`).

## 3. Separación de Responsabilidades (Service Layer vs. Componentes)

Extraer `fetch` a `taskService.js`:

- **Una sola fuente para la URL y el protocolo HTTP:** si cambia `API_URL`, los headers o el formato del cuerpo, se modifica un único archivo.
- **Manejo de errores uniforme:** el servicio transforma respuestas con `!response.ok` en `Error` (rechaza la Promesa), así los componentes solo necesitan `try/catch`.
- **Componentes más simples y testeables:** los componentes de presentación no saben nada de HTTP; solo pintan datos y emiten eventos. El servicio puede probarse o simularse (mock) por separado.
- **Reutilización:** cualquier otro componente o vista puede usar `getTasks`, `createTask` o `deleteTask` sin duplicar código.

## 4. Manejo de Estados Asíncronos en la UI

- **Pending:** `state.loading = true` → se monta `LoadingSpinner` con el mensaje de la operación en curso, y se deshabilitan `TaskForm` (input y botón) y el botón "Refrescar". Se desmonta `ErrorAlert` (se limpia `state.error`). La lista conserva los datos previos.
- **Fulfilled:** `state.loading = false` → se desmonta `LoadingSpinner`, se rehabilitan el formulario y el botón, y `TaskList` se vuelve a montar con las tareas actualizadas (lista completa en GET, tarea añadida en POST, tarea quitada en DELETE).
- **Rejected:** el `catch` asigna `state.error` y el `finally` pone `loading = false` → se desmonta `LoadingSpinner` y se monta `ErrorAlert` con el mensaje y el botón "Reintentar" (que vuelve a ejecutar `handleLoadTasks`). `TaskList` sigue mostrando el último estado conocido.
