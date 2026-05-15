# Donatón - Microservicio de Logística

## Descripción del Proyecto
Este repositorio contiene el **Microservicio de Logística**, desarrollado como parte de la **Evaluación Parcial N°2** de la asignatura Desarrollo Fullstack III. Su función principal es gestionar el inventario de suministros, coordinar los centros de acopio y asegurar que los recursos de la fundación Donatón lleguen de manera eficiente a las zonas de necesidad.

## Arquitectura y Patrones de Diseño

El diseño de este microservicio sigue principios de arquitectura limpia y escalabilidad:

* **Arquitectura de Microservicios:** Este componente es totalmente autónomo, poseyendo su propia base de datos y lógica de servidor. Esto garantiza que la gestión de inventario no se vea afectada por fallos en otros servicios del ecosistema.
* **Patrón Repositorio (Repository Pattern):** Implementado mediante la clase `LogisticaRepository.js`. Este patrón actúa como intermediario entre los controladores y Sequelize, permitiendo una gestión de datos centralizada y facilitando la creación de pruebas unitarias al aislar la lógica de persistencia.
* **Persistencia Relacional (SQL):** Utiliza **PostgreSQL** (alojado en Neon Cloud) para gestionar el inventario. El uso de un motor relacional permite mantener la integridad de los datos.
* **Modularidad NPM:** El proyecto está estructurado de forma modular, adaptando los conceptos de arquetipos profesionales a la gestión de dependencias y scripts de Node.js.

## Rutas del Microservicio (API Interna)

| Método | Ruta | Descripción | Controlador |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Obtiene el stock actual de suministros en los centros. | `obtenerStock` |
| **POST** | `/` | Registra el ingreso de nuevos ítems o suministros. | `registrarIngreso` |
| **GET** | `/test` | Genera un registro de prueba rápido en la base de datos. | `crearDatoPrueba` |

## Stack Tecnológico
* **Runtime:** Node.js
* **Framework:** Express.js
* **Base de Datos:** PostgreSQL (Neon)
* **ORM:** Sequelize
* **Seguridad:** Helmet, CORS

## Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/StevenQR21/donaton-logistica.git
   cd donaton-logistica
   
## **Configuración de entorno**

2. **Crear un archivo .env**
  Se utiliza un archivo .env para poder manejar variables del entorno como puerto, rutas de microservicios o secreto de JWT.
    ```bash
    PORT = 3002
    DB_URL = Url de conexión de la BD

## **Instalar dependencias y correr la API**

3. **Gestor de dependencias de Node.js**
   Para que todo funcione se necesita instalar el gestor de dependencias de Node.js npm y arrancar la api para que empiece a recibir peticiones.
    ```bash
    npm install
    npm run dev

## Repositorios relacionados
- [Frontend de Donaton](https://github.com/diegoparra-git/Proyecto-Donaton-Front)
- [Api Gateway de Donaton](https://github.com/DamagedGhost/donaton-api)
- [Microservicio de Donaciones](https://github.com/diegoparra-git/donaton-donaciones)
- [Microservicio de Terreno](https://github.com/DamagedGhost/donaton-terreno)
