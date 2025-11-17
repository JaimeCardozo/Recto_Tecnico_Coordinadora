# 🧪 Reto Técnico: Automatización de Generación y consulta de guías - Coordinadora

Este proyecto implementa la automatización de pruebas funcionales para el servicio de generación y consulta de guías de Coordinadora, aplicando buenas prácticas de diseño, el patrón de automatización **Screenplay**, y utilizando **Playwright** como motor de ejecución.

---

## ✅ Objetivos cumplidos

- Automatización de escenarios exitosos y de validación para el endpoint `POST /guias`
- Validación de la respuesta mediante el endpoint `GET /guias/{id}`
- Uso del patrón **Screenplay** de forma estructurada y modular
- Organización del código en **tareas**, **habilidades**, **preguntas** y **actores**
- Generación de pruebas automatizadas con `@playwright/test`
- Preparado para integración con reportes Allure (visual e interactivo)

---

## 📦 Tecnologías utilizadas

- [Playwright]
- [TypeScript]
- Patrón **Screenplay** implementado manualmente
- Reportes: Allure

---

## 📂 Estructura del proyecto

```bash
├── data/                   # Fixtures de datos (guías válidas y variantes)
├── screenplay/
│   ├── actors/            # Actor (Juan)
│   ├── abilities/         # Habilidad: CallApiWithToken
│   ├── tasks/             # Tareas: CrearGuia
│   ├── questions/         # Preguntas: ConsultarGuia
├── tests/                 # Casos de prueba funcionales
├── playwright.config.ts   # Configuración del test runner
└── README.md              # Este archivo
```
##🚀¿Cómo ejecutar las pruebas?
1. Instalar dependencias:
  npm install

2. Ejecutar los tests:
   npx playwright test

3. Ver reporte Allure:
  -npx allure generate allure-results --clean -o allure-report
  -npx allure open allure-report

🧪Escenarios automatizados
| Caso                                           | Descripción                      |
| ---------------------------------------------- | -------------------------------- |
| ✅ Crear y consultar guía exitosa               | Flujo completo con datos válidos |
| ✅ Valor mínimo en campo `valorRecaudar`        | Prueba de borde inferior         |
| ✅ Valor máximo en campo `valorRecaudar`        | Prueba de borde superior         |
| ✅ Caracteres especiales en `referenciaRecaudo` | Validación de caracteres especiales|
| ✅ Guía sin campo `observaciones`               | Validación de campos opcionales  |



