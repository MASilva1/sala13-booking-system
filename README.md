<!-- Independent portfolio repository. Historical sanitized source snapshot. -->
# Sala 13 | Meeting Room Booking & Administrative Automation

[![Static checks](https://github.com/MASilva1/sala13-booking-system/actions/workflows/static-checks.yml/badge.svg)](https://github.com/MASilva1/sala13-booking-system/actions/workflows/static-checks.yml) · [Technical audit](docs/auditoria-tecnica-2026-11.md) · [Static validation script](scripts/validate-source.mjs)


**Live institutional use case · Google Apps Script + JavaScript · Administrative process improvement**

**EN — Project overview.** As an administrative area manager at a public university in Argentina, I identified recurring scheduling conflicts and time lost coordinating a shared meeting room. I designed and implemented a web-based self-service booking system integrated with Google Calendar, Google Sheets and email notifications. It supports availability checks, recurring bookings, modification/cancellation flows and pre-meeting reminders. The team reported an **estimated 80% reduction in administrative coordination time** in early use (informal operational estimate, not audited). AI-assisted coding supported development; the running booking platform **does not use a generative AI model**. This repository contains a sanitized September 2026 source snapshot and may differ from the current institutional deployment.

**Key skills:** requirements gathering · process improvement · JavaScript · HTML/CSS · Google Apps Script · Calendar/Sheets integration · email automation · AI-assisted development · human oversight.

[**Institutional booking site**](https://tinyurl.com/sala13idei) · [**Source code**](src/) · [**Architecture**](docs/arquitectura.md) · [**Business case**](docs/caso-de-negocio.md) · [**Deployment notes**](docs/despliegue.md) · [**Technical audit (Nov 2026)**](docs/auditoria-tecnica-2026-11.md)

---

## 📸 Product walkthrough | Capturas reales del sistema

Estas capturas muestran la interfaz del proyecto, preparada para portfolio: sin las pestañas del navegador y con las reservas anonimizadas. No son un diseño conceptual; corresponden al sistema desarrollado.

### 1. Agenda y disponibilidad | Calendar & availability

![Calendario mensual del sistema de reservas Sala 13, con datos anonimizados](assets/01-calendario-disponibilidad.png)

**Qué demuestra:** consulta visual de disponibilidad, reservas ocupadas y navegación por calendario. La oficina deja de responder manualmente cada consulta sobre horarios.

### 2. Autogestión | Booking actions

![Menú de acciones para crear, modificar o cancelar una reserva](assets/02-acciones-reserva.png)

**Qué demuestra:** un mismo punto de entrada para crear, modificar o cancelar reservas; menos intercambios y un circuito de gestión más claro.

### 3. Solicitud digital | Booking form

![Formulario de nueva reserva con datos vacíos, selección de fecha y horario](assets/03-formulario-reserva.png)

**Qué demuestra:** captura estructurada de datos, selección de fecha y horario, modalidad de reserva y aceptación de condiciones antes de enviar.

> **Portfolio note:** Capturas tomadas de la interfaz institucional y preparadas para difusión; los datos de reservas se anonimizaron. No constituyen evidencia de tests automatizados ni una certificación de resultados de rendimiento.

---

## Caso completo en español

**Caso real de transformación digital en la Universidad Nacional de San Juan (Argentina)**

> De coordinar reuniones mediante comunicaciones dispersas a disponer de una agenda digital con disponibilidad visible, solicitudes autogestionadas y seguimiento automatizado.

**Rol:** Matías Andrés Silva — Jefe del Área Administrativa, Instituto de Informática (IdeI), Facultad de Ciencias Exactas, Físicas y Naturales, Universidad Nacional de San Juan.  
**Tipo de proyecto:** solución institucional implementada en el ámbito laboral.  
**Tecnologías:** JavaScript, Google Apps Script, HTML, CSS, Google Calendar, Google Sheets, Gmail / MailApp, FullCalendar.  
**Metodología:** análisis de procesos, diseño funcional, desarrollo iterativo y programación asistida por IA.

[**Ver la aplicación institucional**](https://tinyurl.com/sala13idei) · [Código backend](src/Code.gs) · [Interfaz web](src/Index.html) · [Arquitectura](docs/arquitectura.md) · [Caso de negocio](docs/caso-de-negocio.md)

## 1. El problema: cuando reservar una sala se convierte en trabajo administrativo

En una oficina universitaria, coordinar el uso de una sala compartida demandaba múltiples intercambios para consultar disponibilidad, solicitar fechas, registrar cambios y confirmar el uso. El proceso dependía de la intervención de personal administrativo y podía provocar pedidos superpuestos, demoras de respuesta y errores de comunicación.

**Pregunta de diseño:** ¿cómo convertir una tarea repetitiva en un servicio digital simple, con reglas claras, trazabilidad y supervisión administrativa?

## 2. Mi intervención

Desde mi función administrativa identifiqué el cuello de botella, traduje las necesidades de la oficina en requisitos, diseñé el circuito de reservas y desarrollé e implementé una herramienta integrada al ecosistema de Google Workspace.

El trabajo combinó **conocimiento del proceso de negocio + diseño de experiencia de usuario + desarrollo asistido por IA + automatización**. La IA se utilizó como apoyo en la construcción y mejora del software; **no se afirma que el sistema en ejecución utilice un modelo de IA**.

## 3. La solución

Una aplicación web de reservas para la Sala 13, con calendario visual y reglas de disponibilidad.

| Necesidad de la oficina | Solución incorporada |
|---|---|
| Consultar horarios sin intercambiar mensajes | Agenda visual de disponibilidad |
| Reservar un día o varios | Selección por fechas y rangos horarios, con días consecutivos o separados |
| Repetir reuniones periódicas | Solicitudes con recurrencia semanal |
| Evitar conflictos | Validaciones de ocupación, fechas y horarios |
| Registrar solicitudes | Google Sheets como registro operativo y Calendar como agenda |
| Evitar reservas sin seguimiento | Avisos por correo y flujo de confirmación previo |
| Gestionar cambios y bajas | Acciones por código y flujos de actualización/cancelación |
| Ajustarse a la actividad institucional | Reglas de días no disponibles, horarios y capacidad |

### Recorrido de una reserva

1. La persona consulta el calendario y elige fecha(s) y horario(s).
2. Completa datos de la solicitud y, si corresponde, la recurrencia.
3. El sistema valida las reglas y registra la operación.
4. Se integran los eventos con la agenda y se envían comunicaciones.
5. El circuito de recordatorios permite gestionar la confirmación antes del uso.

La herramienta conserva **intervención humana** para administración, seguimiento y excepciones.

## 4. Arquitectura de la solución

```mermaid
flowchart TD
 A[Usuario de la sala] --> B[Interfaz HTML/CSS/JavaScript + FullCalendar]
 B --> C[Google Apps Script: reglas de negocio]
 C --> D[Google Calendar: agenda y ocupación]
 C --> E[Google Sheets: registro de solicitudes]
 C --> F[Correo: avisos y recordatorios]
 G[Área administrativa: supervisión] --> D
 G --> E
```

La implementación usa tecnologías accesibles en un entorno universitario y evita incorporar infraestructura de servidor propia para este caso de uso. Los identificadores y credenciales de producción **no están incluidos** en este repositorio.

## 5. Impacto en el trabajo

**Resultado reportado durante el uso inicial:** reducción estimada de alrededor de **80 % del tiempo administrativo** dedicado a coordinar reservas, junto con menos intercambios y menor exposición a superposiciones.

> La cifra es una **estimación operativa**, no el resultado de un estudio experimental ni de una medición auditada. Se presenta como referencia de experiencia de implementación.

La mejora importante no es solo ahorrar minutos: es pasar de un proceso dependiente de una persona a uno **visible, reproducible, trazable y más escalable**.

## 6. Capacidades demostradas

- **Business analysis y mejora de procesos:** diagnóstico, relevamiento y traducción de necesidades en funcionalidades.
- **Programación y desarrollo web:** JavaScript, HTML, CSS, Google Apps Script y eventos de calendario.
- **Integraciones:** Google Calendar, Sheets, correo electrónico y despliegue de Web App.
- **Automatización administrativa:** validaciones, recordatorios, gestión de cambios y confirmaciones.
- **Product ownership:** definición de prioridades, ajustes iterativos y orientación a los usuarios.
- **Desarrollo asistido por IA:** uso de herramientas de IA para apoyar la construcción, depuración y evolución de la solución.

## 7. Evidencia técnica

- [Código de lógica de negocio — `src/Code.gs`](src/Code.gs)
- [Interfaz y experiencia de reserva — `src/Index.html`](src/Index.html)
- [Descripción técnica de la arquitectura](docs/arquitectura.md)
- [Caso de negocio y narrativa de impacto](docs/caso-de-negocio.md)
- [Guía de instalación y precauciones](docs/despliegue.md)

**Nota:** el código publicado corresponde a una versión de trabajo conservada en septiembre de 2026, con una referencia del despliegue productivo retirada. Puede diferir de posteriores cambios del sistema institucional. El repositorio es una muestra de portfolio; no es el respaldo oficial ni el entorno de producción.

---

### Para entrevistas

**En 30 segundos:** «Como Jefe Administrativo de un instituto universitario, detecté que gestionar las reservas de una sala compartida consumía tiempo y generaba errores. Diseñé y desarrollé con apoyo de IA una aplicación web integrada con Calendar, Sheets y correo, que automatiza las reservas, valida disponibilidad y mejora el seguimiento. Durante su uso inicial estimamos una reducción cercana al 80 % en el tiempo dedicado a esa gestión. Este proyecto refleja cómo combino experiencia operativa y desarrollo tecnológico para resolver problemas concretos».

**Autor:** Matías Andrés Silva · San Juan, Argentina.  
**Contexto institucional:** Instituto de Informática, FCEFN, Universidad Nacional de San Juan.  
**Alcance:** proyecto realizado en contexto laboral; documentación personal con fines demostrativos. No implica patrocinio ni publicación oficial de la UNSJ.


> **Disclosure:** Este repositorio independiente reutiliza una copia sanitizada de un proyecto documentado en mi [portfolio general](https://github.com/MASilva1/mi-primer-proyecto). Su publicación no implica autorización para utilizar datos institucionales, ni es un producto oficial de la UNSJ.
