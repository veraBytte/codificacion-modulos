## Descripción
El código proporcionado es una aplicación web de gestión de empleados. Utiliza React para crear un formulario y una tabla para agregar, editar, eliminar y consultar empleados. La aplicación se comunica con un servidor RESTful a través de Axios para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en una base de datos.

## Componentes principales
### Funciones y estados
***useState:*** Esta función del hook de React se utiliza para definir y manipular los estados en el componente funcional App. Los estados representan los valores actuales del nombre, edad, país, cargo, antigüedad, ID y si se está editando o no.

***axios***: Esta biblioteca se utiliza para realizar peticiones HTTP al servidor RESTful y se emplea para las operaciones CRUD.

***Swal:*** Es una biblioteca que proporciona ventanas emergentes personalizables para mostrar mensajes al usuario.

***withReactContent:*** Un método de Swal que permite mostrar contenido React dentro de las ventanas emergentes.

### Métodos principales
***add():*** Método para agregar un nuevo empleado enviando una solicitud POST al servidor RESTful. Luego, muestra una ventana emergente de notificación con el resultado de la operación.

***update():*** Método para actualizar un empleado existente enviando una solicitud PUT al servidor RESTful. Luego, muestra una ventana emergente de notificación con el resultado de la operación.

***deleteEmpleado(val):*** Método para eliminar un empleado existente enviando una solicitud DELETE al servidor RESTful. Muestra una ventana emergente para confirmar la acción y otra para notificar el resultado de la operación.

***editarEmpleado(empleado):*** Método para habilitar el modo de edición y prellenar el formulario con los datos del empleado seleccionado.

***limpiarCampos():*** Método para limpiar los campos del formulario y desactivar el modo de edición.

***getEmpleados():*** Método para obtener la lista de empleados desde el servidor RESTful enviando una solicitud GET.

## Estructura de la interfaz de usuario

1. Un formulario con campos para ingresar el nombre, edad, país, cargo y antigüedad del empleado.

2. Un botón para registrar un nuevo empleado o actualizar uno existente, según el estado de edición.

3. Una tabla que muestra la lista de empleados con sus respectivos datos y botones para editar o eliminar cada empleado.

4. Un botón para consultar la lista de empleados en el servidor.

## Cómo usar la aplicación
1. Clona o descarga los archivos necesarios para la aplicación.

2. Asegúrate de tener instalada la versión de React y las dependencias necesarias (como axios, bootstrap, sweetalert2).

3. Ejecuta la aplicación usando npm start o el comando que uses para iniciar proyectos de React.

4. En el navegador, verás la interfaz de usuario de la aplicación para gestionar empleados.

5. Completa el formulario y haz clic en el botón "Registrar" para agregar un nuevo empleado. Si se desea editar un empleado existente, haz clic en el botón "Editar" correspondiente en la tabla.

6. Haz clic en el botón "Eliminar" para eliminar un empleado de la tabla.
Utiliza el botón "Consultar" para obtener la lista actualizada de empleados desde el servidor.

7. Utiliza el botón "Consultar" para obtener la lista actualizada de empleados desde el servidor.

## Notas adicionales
1. Asegúrate de tener un servidor RESTful en http://localhost:3001 que acepte las peticiones para crear, actualizar, eliminar y obtener empleados.

2. Antes de usar la aplicación en un entorno de producción, considera implementar medidas de seguridad adecuadas para proteger el