# Calculadorasderedes

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7eba2d6-5eba-45ca-b149-c6754a6ae979/deploy-status)](https://app.netlify.com/projects/calculadoradered/deploys)

Aplicacion orientada a redes y conversion numerica.

Incluye herramientas para calculo de direccionamiento IP, conversion universal de bases (binario, octal, decimal y hexadecimal), guia de subneteo y calculadora cientifica.

## Estructura del proyecto

- `Calculadoras/`: Frontend en Vue 3 + Vite.
- `backend/`: API en Node.js + Express.

## Funcionalidades principales

- Calculadora de redes IPv4 (red, broadcast, mascara, wildcard y rango de hosts).
- Conversor universal de bases numericas.
- Explicacion guiada de subneteo.
- Calculadora cientifica con funciones y atajos.

## Ejecucion local

### 1) Backend

```bash
cd backend
npm install
npm run start
```

### 2) Frontend

```bash
cd Calculadoras
npm install
npm run dev
```
