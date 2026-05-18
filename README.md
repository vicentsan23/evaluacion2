# Panel de Gestión de Miembros - JS Avanzado



Aplicación web funcional desarrollada para la Evaluación Sumativa 2, enfocada en la gestión dinámica de datos, seguridad y buenas prácticas de desarrollo.



## 🤖 Uso de IA (Documentación de Apoyo)



Para este proyecto, se integró el uso de Inteligencia Artificial como asistente de desarrollo para optimizar los siguientes puntos:



1.  **Refactorización de Seguridad (XSS):**

&#x20;   **Prompt:** "¿Cómo puedo evitar el uso de innerHTML para renderizar una lista de objetos de forma segura en el DOM?"

&#x20;   **Mejora aplicada:** Se implementó el uso de `createElement` y `textContent`. Esto garantiza que los datos del usuario se manejen como texto plano, neutralizando cualquier intento de inyección de scripts.



2.  **Lógica de Validación de Duplicados:**

&#x20;   **\*Prompt:** "Necesito una forma eficiente en JS para verificar si un email ya existe dentro de un arreglo de objetos antes de agregarlo."

&#x20;   **Mejora aplicada:** Se incorporó el método `.some()`, mejorando la eficiencia de búsqueda en comparación con un ciclo `for` tradicional y garantizando la integridad de los datos.



3.  **Estructura UI con Tailwind:**

&#x20;   **Prompt:** "Genera una estructura de formulario y lista moderna usando clases de Tailwind CSS en modo oscuro."

&#x20;   **Mejora aplicada:** Se logró una interfaz profesional y responsiva (Criterio 6) sin sobrecargar el proyecto con archivos CSS externos pesados.



---



## 🚀 Despliegue

La aplicación se encuentra disponible en: https://vicentsan23.github.io/evaluacion2/

