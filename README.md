

---

# FlushFinder
![FlushFinder Logo](/logo.svg)


## Descripción
FlushFinder es una aplicación diseñada para facilitar la localización y calificación de baños públicos. Permite a los usuarios encontrar baños cercanos, ver detalles como la limpieza y disponibilidad, y dejar comentarios y calificaciones.

## Características
- **Búsqueda de Baños**: Encuentra baños cercanos basados en tu ubicación actual.
- **Calificaciones y Comentarios**: Los usuarios pueden calificar los baños y dejar comentarios sobre su experiencia.
- **Administración de Baños**: Los administradores pueden añadir, editar o eliminar información sobre baños.

## Tecnologías Utilizadas
- Backend: Node.js con Express.js
- Base de Datos: MySQL
- ORM: Sequelize
- Frontend: React Native

## Instalación

Para instalar FlushFinder, sigue estos pasos:

1. Clona el repositorio:
   ```
   git clone https://github.com/GabrieLag00/FlushFinder.git
   cd flushfinder
   ```

2. Instala las dependencias del frontend:
   ```
   npm i
   ```
3. Configura el Backend e instala dependencias
   ```
   cd BackFlushFinder
   npm i
   ```
   crea la base de datos en phpmyadmin , debe llamarse "banointeligente" y dirijete a `src/connect.js` cambia el puerto en caso de ser necesario
   ```
       // Configuración para la conexión a la base de datos
    const config = {
        host: 'localhost', // o 'server-address' si el servidor está en otro lugar
        port: 3306, // CAMBIAR PUERTO DE SER NECESARIO
        user: 'root',
        password: '',
        database: 'banointeligente'
    };
   ```
   
4. Configura tu base de datos MySQL y actualiza el archivo `config/config.json` con tus credenciales de base de datos.Recuerda Cambiar el puerto en caso de ser necesario.
   ```
     {
    "development": {
      "username": "root",
      "password": null,
      "database": "banointeligente",
      "host": "127.0.0.1",
      "port": 3306,//CAMBIAR EN CASO DE SER NECESARIO
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "banointeligente",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "banointeligente",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
      
    }
   }

   ```

5. Ejecuta las migraciones para configurar tu base de datos:
   ```
   npx sequelize-cli db:migrate
   ```

6. Inicia el servidor (del lado del backend):
   ```
   cd BackFlushFinder
   
   npm run dev
   ```
6. Inicia el servidor (del lado del frontend):
   ```
   cd FlushFinder
   
   npx expo start
   ```
## Uso

Los usuarios tendran una interfaz llamativa y sencilla que les permitira , ver la disponibilidad de los baños. Tendran que iniciar sesion o registrarse en caso de , para ingresar.

## Contribuir

Si deseas contribuir al proyecto, canche nmms contribuye en el pinche proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia [MIT](LICENSE).

---
## Consideraciones

Compatibilidad de Módulos CommonJS y ESM
Este proyecto está configurado para utilizar ECMAScript Modules (ESM), la última versión del estándar JavaScript para importar y exportar módulos. Sin embargo, algunas herramientas o dependencias pueden esperar módulos en el formato CommonJS, lo que podría ocasionar incompatibilidades.

Miardair Infiel
Puto emi
Puto Canche
