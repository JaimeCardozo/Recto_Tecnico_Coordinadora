Feature: Creación y consulta de guías con servicio Recaudo Contra Entrega

  Como usuario del sistema de guías
  Quiero poder registrar y consultar guías con el servicio de Recaudo Contra Entrega
  Para asegurar la integridad, validación y persistencia de los datos enviados

  Background:
    Dado que soy un usuario autenticado

  # Escenarios positivos
  Scenario: Creación exitosa de una guía con recaudo contra entrega
    Cuando envío una solicitud POST con todos los campos obligatorios correctamente diligenciados
    Entonces el sistema debe responder con código 200 OK
    Y debe devolver un identificador único de la guía creada

  Scenario: Consulta de guía creada exitosamente
    Dado que he creado una guía con el servicio Recaudo Contra Entrega
    Y tengo el identificador único retornado por el sistema
    Cuando consulto la guía usando el endpoint GET /guias/{id}
    Entonces el sistema debe responder con código 200 OK
    Y los datos retornados deben coincidir con los enviados en la creación

  Scenario: Creación exitosa con valor mínimo permitido
    Cuando ingreso exactamente $1 como valor a recaudar
    Y envío la solicitud para crear la guía
    Entonces el sistema debe responder con código 200 OK
    Y debe almacenar correctamente los datos

  Scenario: Creación exitosa con valor máximo permitido
    Cuando ingreso exactamente $16'000.000 como valor a recaudar
    Y envío la solicitud para crear la guía
    Entonces el sistema debe responder con código 200 OK
    Y debe almacenar correctamente los datos

  Scenario: Ingreso de caracteres especiales en el campo "referenciaRecaudo"
    Cuando escribo "@#%*Ref:Pago!" en el campo "referenciaRecaudo"
    Y envío la solicitud para crear la guía
    Entonces el sistema debe responder con código 200 OK
    Y debe aceptar los caracteres especiales sin errores

  Scenario: Creación exitosa omitiendo campos opcionales
    Cuando omito campos opcionales como "observaciones"
    Y envío la solicitud para crear la guía
    Entonces el sistema debe responder con código 200 OK
    Y debe almacenar correctamente los campos obligatorios

  # Escenarios negativos
  Scenario: Error al ingresar una referencia de recaudo con demasiados caracteres
    Cuando ingreso una referencia de recaudo que excede la longitud máxima permitida
    Y envío la solicitud para crear la guía
    Entonces el sistema debe responder con código 400 Bad Request
    Y debe indicar que la referencia supera el límite de caracteres

  Scenario: Error al ingresar un valor a recaudar fuera del rango permitido
    Cuando ingreso un valor menor a $1 o mayor a $16'000.000 en el campo "valorRecaudar"
    Y envío la solicitud para crear la guía
    Entonces el sistema debe responder con código 400 Bad Request
    Y debe indicar que el valor está fuera del rango permitido

  Scenario: Error al dejar vacíos campos obligatorios
    Cuando no ingreso datos en los campos "valorRecaudar" y "referenciaRecaudo"
    Y envío la solicitud para crear la guía
    Entonces el sistema debe responder con código 400 Bad Request
    Y debe mostrar un mensaje indicando que los campos son obligatorios

  Scenario: Consulta fallida de una guía inexistente
    Cuando consulto una guía con un identificador que no existe
    Entonces el sistema debe responder con código 404 Not Found
    Y debe indicar que la guía no fue encontrada

  Scenario: Consulta fallida sin token de autenticación
    Cuando consulto una guía sin enviar el token de autorización
    Entonces el sistema debe responder con código 401 Unauthorized
    Y debe rechazar la solicitud por falta de autenticación

  # Escenario de concurrencia
  Scenario: Creación de guías concurrentes
    Dado que múltiples usuarios están autenticados
    Y cada uno tiene una guía válida para crear
    Cuando todos envían sus solicitudes al mismo tiempo
    Entonces el sistema debe responder con código 200 OK para cada uno
    Y cada guía debe crearse sin errores de concurrencia
