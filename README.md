# 🛒 Shopyline - Tienda Online con React

Shopyline es una tienda online de práctica desarrollada con **React** que consume productos desde una API externa [FakeStoreAPI](https://fakestoreapi.com/). El proyecto está enfocado en el uso de **React Hooks** como `useContext`, la modularización de componentes y el consumo de API.

🔹 **Este proyecto no incluye la funcionalidad de compra**, pero sí un carrito de compras donde se pueden agregar y visualizar productos.

---

## 🚀 Tecnologías utilizadas

### **📌 Dependencias principales:**
- **React 19** y **React-DOM 19** - Librería principal para la construcción de la UI.
- **React Router DOM 7** - Manejo de rutas para la navegación de la aplicación.
- **Bootstrap 5** y **Bootstrap Icons** - Estilos y componentes responsivos.

### **⚙️ Dependencias de desarrollo:**
- **Vite** - Herramienta de construcción rápida para proyectos con React.
- **TypeScript** - Tipado estático para mejorar la seguridad del código.
- **ESLint** y **TypeScript-ESLint** - Linter para mantener buenas prácticas en el código.

---

## 📦 Instalación y ejecución

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/shopyline.git
   cd shopyline
   ```

2. **Instalar dependencias:**
   ```sh
   npm install
   ```

3. **Ejecutar el proyecto en modo desarrollo:**
   ```sh
   npm run dev
   ```

4. **Abrir en el navegador:**
   La aplicación estará disponible en `http://localhost:5173`

---

## 🛍️ Características principales

✅ **Listado de productos** obtenidos desde la API [FakeStoreAPI](https://fakestoreapi.com/).
✅ **Filtrado de productos** por precio y categoría con `useContext`.
✅ **Carrito de compras** sin funcionalidad de pago.
✅ **Diseño responsivo** con Bootstrap 5.
✅ **Manejo de rutas** con `react-router-dom`.

---

## 📁 Estructura del Proyecto
```
shopyline/
│── src/
│   ├── components/    # Componentes reutilizables
│   ├── context/       # Context API para el estado global
│   ├── pages/         # Vistas principales (Home, ProductDetails, Cart)
│   ├── hooks/         # Hooks personalizados
│   ├── assets/        # Imágenes y estilos
│   ├── App.tsx        # Componente principal
│   ├── main.tsx       # Punto de entrada del proyecto
│── public/            # Archivos estáticos
│── package.json       # Configuración del proyecto y dependencias
│── tsconfig.json      # Configuración de TypeScript
│── vite.config.ts     # Configuración de Vite
```

---

## 🎯 Objetivo del Proyecto
Este proyecto tiene como propósito reforzar el conocimiento en:
- **React y Hooks (useContext, useEffect, useState)**
- **Consumo de APIs con Fetch o Axios**
- **Modularización y reutilización de componentes**
- **Manejo de estado global con Context API**
- **Diseño responsivo con Bootstrap**

---
