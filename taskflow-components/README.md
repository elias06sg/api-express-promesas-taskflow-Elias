# TaskFlow Components (solución del taller)

Frontend en Vanilla JS con arquitectura de componentes que consume la API Express de este repositorio (GET, POST, DELETE) usando Promesas con `fetch` y `async/await`.

## Ejecución

```bash
# Terminal 1 (raíz del repo): API en http://localhost:3001
npm install && npm start

# Terminal 2: frontend en http://localhost:3000
cd taskflow-components
npx live-server --port=3000
```

## Estructura

```
taskflow-components/
├── index.html                 # Solo <div id="root"></div>
├── css/styles.css
└── js/
    ├── main.js                # Monta App en #root
    ├── services/taskService.js# getTasks, createTask, deleteTask
    └── components/            # Header, TaskForm, TaskItem, TaskList,
                               # LoadingSpinner, ErrorAlert, App
```

Las respuestas del cuestionario están en [`RESPUESTAS.md`](./RESPUESTAS.md).
