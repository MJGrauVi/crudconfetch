# Flujo de responsabilidades

useApi.js        → lógica HTTP

ProveedorDiscos  → estado + funciones de dominio

useDiscos        → acceso cómodo al contexto

Componentes      → UI


## Responsabilidades claras

| Archivo               | Hace qué                   |
| --------------------- | -------------------------- |
| `useApi.js`           | fetch, post, put, delete   |
| `ProveedorDiscos.jsx` | maneja estado y usa useApi |
| `useDiscos.js`        | solo `useContext`          |
| Componentes           | llaman a `useDiscos()`     |


##
