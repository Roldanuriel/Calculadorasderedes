# Frontend - Calculadoras de Redes

Frontend construido con Vue 3 y Vite para la plataforma Calculadorasderedes.

## Objetivo

Proveer una interfaz moderna, rapida y clara para herramientas de redes y calculo tecnico:

- Calculadora de redes IPv4.
- Conversor universal de bases (binario, octal, decimal y hexadecimal).
- Guia de subneteo.
- Calculadora cientifica.

## Stack

- Vue 3 (Composition API).
- Vite.
- CSS modular por componentes y layout principal.

## Estructura relevante

- `src/pages/`: Vistas por herramienta.
- `src/components/`: Componentes reutilizables de layout y UI.
- `src/services/`: Integracion con API backend.
- `src/utils/`: Logica funcional de calculo y conversion.
- `src/hooks/`: Composables para estado de UI.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Nota de integracion

El frontend consume endpoints bajo `/api` y puede trabajar con fallback local en utilidades si el backend no esta disponible.
