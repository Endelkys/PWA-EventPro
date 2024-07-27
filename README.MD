# Eventpro - Progressive Web App (PWA).

**Eventpro** es una Progressive Web App (PWA) diseñada para alojar eventos que sucederán en Valera. Esta aplicación permite a los usuarios explorar eventos, comprar boletos, y a los promotores enviar solicitudes para publicar sus eventos en la plataforma. Además, cuenta con roles de usuario, promotores y admins, cada uno con sus respectivos privilegios.

Todos los datos de la app están alojados en una base de datos en **MongoDB** para su uso y visualización. Tiene una interfaz agradable al usuario en tonos de morado y de negro ademas de funcionar en vistas tanto de computadora, como de telefono y tablet.
 
 ## Características.

- Registro y login de usuarios y promotores.

- Exploración de eventos.

- Compra de boletos para eventos.

- Solicitud de promotores para publicar eventos.

- Panel de administrador para ver actividad de la app y gestionar datos.

- Diseño responsive para diferentes dispositivos.

- Desarrollada con React y utilizando Tailwind CSS como framework de estilos.

## Tecnologías Utilizadas.

- [React](https://es.reactjs.org/): Es una librería que permite crear interfaces de usuario a partir de componentes, se utiliza junto a Vite para proveer al proyecto.

- [Node.js](https://nodejs.org/docs/latest/api/): Se trata de un entorno para programar basado en Javascript que provee al desarrollador de múltiples herramientas para la creación de aplicaciones.

- [Express](https://expressjs.com/es/): Es un framework web para Node Js, y está encargado de administrar rutas y servidores en aplicaciones web y móviles.

- [CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS): El Cors o intercambio de recursos de origen cruzado constituye uno de los sistemas de los protocolos HTTP y puede utilizarse para habilitar o inhabilitar el uso de Javascript de origen cruzado.

- [Multer](https://multer.js.org/): Es un middleware de Node Js utilizado dentro del Backend, y está encargado de manejar datos de tipo multipart/form-data.

- [Nodemon](https://nodemon.io/): Es una herramienta de desarrollo para iniciar el Node Js para el desarrollo en el mismo.

- [Axios](https://axios-http.com/docs/intro/): Axios es una biblioteca de JavaScript que facilita el trabajo con API REST. Es una biblioteca HTTP.

- [Framer Motion](https://www.framer.com/motion/): Librería de React orientada a la interacción y animación de Framer.

- [Vite](https://vitejs.dev/): Es una herramienta rápida para la creación de proyectos de aplicaciones web, en este proyecto se usó junto a React como base para el Frontend.

- [Tailwind](https://tailwindcss.com/): Es un framework de CSS para generar clases que sirven para agilizar el trabajo dentro del desarrollo de la interfaz de usuario.

- [Lucide-react](https://lucide.dev/guide/packages/lucide-react): Es una librería de iconos de Lucida, implementado en react de manera nativa y con formatos svg.
- 
- [Jest](https://jestjs.io/): Se trata de un Framework de Javascript para probar el funcionamiento específico los distintos componentes de React.

## Instalación.

- Abre *Visual Studio Code*.

- Ve al menú "File" (Archivo) en la barra de herramientas y selecciona "Open Folder" (Abrir carpeta), o simplemente presiona Ctrl + K seguido de Ctrl + O para abrir el diálogo de apertura de carpeta.

- En el cuadro de diálogo que aparece, navega hasta el directorio donde deseas clonar el repositorio.

- Una vez que hayas seleccionado el directorio, haz clic en "Seleccionar Carpeta" o "Open" para abrirlo en Visual Studio Code.

- Luego, ve al menú "View" (Ver) en la barra de herramientas y selecciona "Command Palette" (Paleta de comandos), o simplemente presiona Ctrl + Shift + P.

- Escribe Git: Clone en la paleta de comandos y presiona Enter.

- Se te pedirá que ingreses la URL del repositorio que deseas clonar. Ingresa https://github.com/Endelkys/PWA-EventPro.git y presiona Enter.

- Luego, se te pedirá que elijas la carpeta donde deseas clonar el repositorio. Si ya has seleccionado la carpeta en el paso 3, simplemente presiona Enter para clonar el repositorio en esa carpeta. De lo contrario, navega hasta la carpeta deseada y selecciónela.

- Visual Studio Code comenzará a clonar el repositorio desde GitHub. Puedes ver el progreso en la barra de estado en la parte inferior de la ventana de Visual Studio Code.

- Una vez completado el proceso, verás que se ha agregado un nuevo directorio con el nombre de EventPro en el explorador de archivos de Visual Studio Code.

- Al abrirlo tendrás 2 carpetas una de Backend y una de FrontEnd

- En la carpeta BackEnd haz click izquierdo sobre ella y elige la opción de "abrir en terminal integrada"

- Instala las dependencias utilizando el comando npm install. 

- En la carpeta FrontEnd/EventPro haz click izquierdo sobre ella y elige la opción de "abrir en terminal integrada"

- Instala las dependencias utilizando el comando npm install.

- Esto deberá generar los archivos node_modules.

- Configura la conexión a la base de datos *MongoDB* conectandola en *MongoDb Compass*.

- Para ello accede a la url de database mongodb+srv://${MONGODB_NAME}:${MONGODB_PASS}@eventpro.j9agcmc.mongodb.net/${MONGODB_NAME}

- Tanto ${MONGODB_NAME} como ${MONGODB_PASS} deben ser reemplazados por sus valores en .env.    

- Ahora regresa al Visual Studio Code y dirígete a la sección inferior del mismo en las terminales.  

- Inicia la aplicación con el comando npm run dev en la terminal Backend.

- En la terminal BackEnd te saldrá un mensaje que dirá:
`Server listen on port:  4000
Conectado a la BD`

- Inicia la aplicación con el comando npm run build seguido de npm run preview en la terminal FrontEnd.

- En la terminal Frontend te saldrá un mensaje que dirá: http://localhost:3000/.

- Accede a él para ser redirigido a la página principal de la app en tu navegador predeterminado.

- Ahora puedes disfrutar de la app online o haciendo click en el icono de instalar en la barra de navegación de Google, puedes instalar la app en tu escritorio para usarla de forma local.

- Se debe iniciar nuevamente el npm run preview para poder utilizar la pwa.

- Por último, *Disfruta de la Aplicación*.

## Autores.

[Endelkys Matos.](https://github.com/Endelkys)

[Juan Simonaro.](https://github.com/juansimonaro)

[Daniel Rendon.](https://github.com/SrryBro)
