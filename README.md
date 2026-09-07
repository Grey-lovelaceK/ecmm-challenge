# Prueba técnica Junior Fullstack

Construye una aplicación sencilla para administrar un catálogo de productos. La
solución debe incluir una API REST en Django y una interfaz web que la consuma.

**Tiempo estimado de desarrollo:** 90 minutos.

Este tiempo es una referencia para dimensionar el alcance y no un límite de
ejecución. Se recomienda priorizar una solución simple, funcional y clara.

## Alcance

### API

La API debe permitir:

- Listar productos y consultar uno por su ID.
- Crear, editar y eliminar productos.
- Filtrar productos por categoría.
- Buscar productos por nombre.

Una **categoría** debe contener:
- nombre


Un **producto** debe contener:
- nombre
- descripción
- precio
- stock
- categoría
- fecha de creación

### Interfaz web

La interfaz debe permitir, como mínimo:

- Visualizar el listado de productos.
- Crear un producto mediante un formulario.
- Filtrar o buscar productos.

Puedes utilizar Next.js u otro framework basado en React. La elección queda a tu
criterio y debe ser adecuada al alcance de la solución.

## Reglas

- El backend debe utilizar Django y Django REST Framework.
- La base de datos debe ser SQLite.
- El nombre de cada categoría debe ser único.
- Nombre, precio, stock y categoría son obligatorios.
- El precio debe ser mayor o igual a cero.
- El stock debe ser un entero mayor o igual a cero.
- La categoría asociada debe existir.
- Los errores de validación deben devolver una respuesta HTTP apropiada y comprensible.

No se requiere autenticación, carrito de compras, órdenes, pagos ni despliegue.

## Entregables

- API e interfaz web funcionales.
- Migraciones de base de datos.
- Al menos dos pruebas automatizadas: creación correcta de un producto y rechazo
  de datos inválidos.
- Instrucciones completas para ejecutar el proyecto.

La organización de endpoints y la elección de herramientas adicionales quedan a
criterio del postulante.

## Uso de herramientas de IA

Puedes utilizar herramientas de IA como apoyo. Si lo haces, indícalo brevemente
en tus anotaciones junto con el propósito para el que las utilizaste. Debes
comprender todo el código presentado; estas herramientas no reemplazan el dominio
de la solución.

## Proceso de entrega

Realiza un fork de este repositorio y desarrolla allí tu solución. Al finalizar,
comparte el enlace público al fork según las instrucciones recibidas.

El plazo para enviar la solución es de **cinco días corridos** desde la recepción
de la prueba. Una vez vencido ese plazo, no se recibirán nuevas entregas.

## Criterios de evaluación

- Cumplimiento de los requisitos y funcionamiento de los endpoints.
- Uso adecuado de modelos, serializers y vistas.
- Integración entre la interfaz y la API.
- Elección de herramientas acorde con el alcance solicitado.
- Claridad, organización y comprensión del código.
- Calidad de las validaciones, pruebas y documentación.

---

## Anotaciones del postulante

### Instrucciones de ejecución

**Backend (Django + DRF):**

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows PowerShell: venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

La API queda en `http://127.0.0.1:8000/api/` (`categorias/` y `productos/`).

**Frontend (Next.js), en otra terminal:**

```bash
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:3000`. Si en tu entorno `localhost` no responde (pasó en
el mío por una interfaz de red particular), Next.js también imprime una URL de
red alternativa en la consola al arrancar; esa sirve igual.

**Pruebas automatizadas:**

```bash
cd backend
python manage.py test
```

### Decisiones y observaciones

- Modelos y campos en español (`Categoria`, `Producto`, `nombre`, `precio`,
  `stock`, `categoria`, `fecha_creacion`), siguiendo el vocabulario que ya usa
  el propio enunciado.
- `on_delete=PROTECT` en `Producto.categoria`: evita borrar una categoría que
  todavía tiene productos asociados, en vez de fallar en cascada o en silencio.
- Filtro y búsqueda como query params sobre el mismo endpoint de listado
  (`GET /api/productos/?categoria=<id>&buscar=<texto>`), en vez de endpoints
  separados — es lo mismo que pide el enunciado con menos superficie de API.
- `categoria_nombre` expuesto como campo de solo lectura en el serializer de
  `Producto`, para que el frontend no tenga que pedir la categoría aparte solo
  para mostrar su nombre.
- CORS abierto (`CORS_ALLOW_ALL_ORIGINS = True`): es un entorno de prueba local
  sin autenticación, no producción.
- El frontend quedó en un solo componente (`app/page.tsx`) dado el alcance
  acotado de la prueba; en un proyecto real separaría formulario, listado y
  filtros en componentes propios.
- La interfaz cubre listar, crear, filtrar y buscar (lo mínimo que pide el
  enunciado). Editar y eliminar sí están en la API pero no en la interfaz.

### Herramientas de IA utilizadas

Uso IA (Claude, con subagentes) como parte de mi flujo de trabajo diario. En
esta prueba lo usé de la misma forma: me generó el código base de modelos,
serializers, vistas y la interfaz siguiendo las reglas del enunciado, y yo fui
pegando, ejecutando y verificando cada paso — corriendo migraciones, los
tests, y depurando un problema real de mi entorno (el dev server de Next.js
bloqueando recursos por acceder desde una IP de red en vez de `localhost`)
hasta entender la causa y resolverlo en `next.config.ts`.
