# Auditoría técnica del portfolio — Sala 13
**Fecha:** 8 de noviembre de 2026 · **Alcance:** lectura estática del código público de referencia, documentación y evidencias; sin acceso a Calendar/Sheets institucionales ni ejecución sobre producción.

## Resultado
El repositorio documenta una solución administrativa real y muestra código suficiente para entrevistas. **No equivale a una certificación de seguridad ni a una versión lista para instalar en producción.**

### Comprobaciones realizadas
- El código backend es JavaScript sintácticamente válido (comprobación local con `node --check` sobre el archivo de referencia conservado).
- Existen formularios de alta, modificación y cancelación; vistas de disponibilidad y notificaciones.
- Se implementa `LockService` alrededor de operaciones críticas y controles de conflicto con Google Calendar.
- La cancelación desde el sitio utiliza verificación por correo y límite de intentos; los enlaces de recordatorio usan token aleatorio y hash almacenado.
- El código público no presenta claves API ni credenciales evidentes en las búsquedas de patrones efectuadas. **Esto no descarta toda exposición posible.**

## Hallazgos, por prioridad
| Nivel | Hallazgo | Riesgo / acción |
|---|---|---|
| **Alta** | `updateReservation` y `getReservationForEdit` usan código o nombre + correo declarado, sin verificación de control de la casilla para esa ruta | Alguien que conozca los datos podría consultar o modificar una reserva. Antes de ampliar el uso, agregar verificación por correo también para modificaciones y limitar datos devueltos. |
| **Alta** | `getFutureReservations()` consulta eventos desde hoy hasta 2100 mediante `calendar.getEvents` | Escala mal a medida que crece el calendario y puede encontrar límites/tiempos de Apps Script. Reemplazar por paginación o ventana acotada. |
| **Media** | Las reservas recurrentes se registran en una fila con múltiples eventos; el recordatorio de 48 h usa la fecha de inicio del grupo | La confirmación y cancelación se aplican a la reserva agrupada; no consta control independiente por ocurrencia. Aclarar el alcance y, si se necesita gestión parcial, rediseñar el modelo de datos. |
| **Media** | `setXFrameOptionsMode(ALLOWALL)` permite embeber la app | Necesario si se incrusta en Google Sites; requiere evaluación de `clickjacking`, configuración de despliegue y mitigaciones de interfaz. |
| **Media** | `calendarEventToPublic_` devuelve `event.getId()` en respuestas públicas | Evaluar si puede utilizarse un identificador de UI no reversible en vez del ID real del evento. |
| **Media** | El backend almacena solicitante/correo/motivo en la descripción de eventos | Revisar permisos de Calendar y principio de mínimo acceso; la vista web no devuelve esos campos, pero otros permisos de Calendar podrían permitir verlos. |
| **Media** | Actualización de varios eventos y fila de Sheet no es transacción atómica | Simular fallos parciales e implementar reconciliación/alertas para inconsistencias entre Calendar y Sheets. |
| **Baja** | El código pública incluye comentarios de URL fija aunque ahora usa `ScriptApp.getService().getUrl()` | Corregir comentario en una futura actualización controlada para evitar confusión. |

## Pruebas pendientes ANTES de usarlo como plantilla
- [ ] Alta de reserva simple, múltiple, recurrente y conflictiva, con calendario de pruebas.
- [ ] Cambios y cancelaciones con y sin acceso efectivo al correo.
- [ ] Verificación de reglas de fechas, feriados y horarios con casos de borde.
- [ ] Recordatorios de 48 h para una reserva única y para todas las ocurrencias de una serie.
- [ ] Fallos simulados de Calendar, Sheets y MailApp; comprobar recuperación sin duplicados.
- [ ] Medición de respuesta y cuotas para 100, 500 y 1.000 eventos ficticios.
- [ ] Revisión de permisos, publicación pública, datos personales y aprobación institucional.

## Calidad de las afirmaciones del portfolio
- **Sistema aplicado:** respaldado por código, capturas y enlace al sitio institucional.
- **Ahorro estimado de 80 %:** se declara como percepción/estimación operativa inicial, no KPI auditado.
- **IA:** se empleó como ayuda de desarrollo, no se afirma inferencia de IA en producción.
- **Versión:** snapshot de septiembre de 2026; no se afirma identidad con el despliegue más reciente.

**Decisión de auditoría:** no modificar automáticamente la lógica del sistema de referencia ni el despliegue real. Resolver los hallazgos en una rama de desarrollo y probarla en un entorno aislado antes de cualquier adopción.
