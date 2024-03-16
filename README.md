# Proyecto de Gestión de Empleados y Solicitudes

Este proyecto es una aplicación web para la gestión de empleados y solicitudes, desarrollada con React en el frontend y Node.js en el backend.

## Instalación

1. Clona el repositorio:

```bash
por https
git clone https://github.com/mauricio1020/test-node.git

por ssh:
git clone  git@github.com:mauricio1020/test-node.git


Instala las dependencias del frontend y del backend:
cd nombreproyecto
cd frontend
npm install

cd nombreproyecto
npm install
node index.js


Este proyecto utiliza una base de datos MySQL. Asegúrate de tener MySQL instalado en tu sistema.

Crea una nueva base de datos llamada testdb:

1. CREATE DATABASE testdb;

2. CREATE TABLE Empleado (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(50),
    FECHA_INGRESO DATE,
    SALARIO DECIMAL(10, 2)
);

3. CREATE TABLE Solicitud (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CODIGO VARCHAR(50),
    DESCRIPCION VARCHAR(50),
    RESUMEN VARCHAR(50),
    ID_EMPLEADO INT,
    FOREIGN KEY (ID_EMPLEADO) REFERENCES Empleado(ID)
);


Inicia el servidor backend:
cd backend
npm start
idor backend:

Inicia el servidor frontend:

cd frontend
npm start


