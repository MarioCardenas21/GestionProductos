# 📦 Gestión de Productos - API REST con NestJS

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/) 
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/) 
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/) 
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://www.docker.com/) 

API REST profesional desarrollada en **NestJS + TypeORM + PostgreSQL**.  
Implementa **arquitectura por capas**, validaciones de DTOs, reglas de negocio y un endpoint de búsqueda avanzada con paginación y filtros.  

---

## 🚀 Características
- CRUD completo de productos (`id, nombre, descripcion, precio, stock, sku`).
- Validaciones con [`class-validator`](https://github.com/typestack/class-validator).
- Reglas de negocio:
  - `sku` debe ser único.
  - `stock` no puede ser negativo.
  - No se puede eliminar un producto con `stock > 0`.
- Endpoint de búsqueda avanzada con:
  - Paginación (`page`, `limit`).
  - Orden dinámico (`sortBy`, `order`).
  - Filtros opcionales (`id`, `nombre` LIKE, `descripcion` LIKE, `sku` exacto).
- Conexión a **PostgreSQL en Docker**.

---

## 📂 Estructura del Proyecto
