import { test } from '@playwright/test';
import { Actor } from '../screenplay/actors/Actor';
import { CallApiWithToken } from '../screenplay/abilities/CallApiWithToken';
import { CrearGuia } from '../screenplay/tasks/CrearGuia';
import { guiaValida } from '../data/guiaValida';
import { ConsultarGuia } from '../screenplay/questions/ConsultarGuia';
import { guiaValorMinimo } from '../data/guiaValorminimo';
import { guiaValorMaximo } from '../data/guiaValorMaximo';
import { guiaCaracteresEspeciales } from '../data/guiaCaracteresEspeciales';
import { guiaOmitiendoCampo } from '../data/guiaOmitiendoOpcional';

test.describe('Escenarios de casos exitosos', () => {

test('Creación exitosa de una guía y consulta de guía creada exitosamente', async () => {
  const api = await CallApiWithToken.usingToken();
  const juan = new Actor('Juan').whoCan(api);

  const id = await CrearGuia.conDatos(guiaValida).performAs(juan);

  await ConsultarGuia.conId(id, {
    referenciaRecaudo: guiaValida.referenciaRecaudo,
    valorRecaudar: guiaValida.valorRecaudar,
  }).performAs(juan);
  
});

test('Valor mínimo en el campo Valor a recaudar y consulta del valor', async () => {
  const api = await CallApiWithToken.usingToken();
  const juan = new Actor('Juan').whoCan(api);

  const id = await CrearGuia.conDatos(guiaValorMinimo).performAs(juan);

  await ConsultarGuia.conId(id, {
    referenciaRecaudo: guiaValorMinimo.referenciaRecaudo,
    valorRecaudar: guiaValorMinimo.valorRecaudar,
  }).performAs(juan);
  
});

test('Valor maximo en el campo Valor a recaudar y consulta del valor', async () => {
  const api = await CallApiWithToken.usingToken();
  const juan = new Actor('Juan').whoCan(api);

  const id = await CrearGuia.conDatos(guiaValorMaximo).performAs(juan);

  await ConsultarGuia.conId(id, {
    referenciaRecaudo: guiaValorMaximo.referenciaRecaudo,
    valorRecaudar: guiaValorMaximo.valorRecaudar,
  }).performAs(juan);
  
});

test('Creacion de guia con Caracteres especiales en Referencia y Consulta del valor', async () => {
  const api = await CallApiWithToken.usingToken();
  const juan = new Actor('Juan').whoCan(api);

  const id = await CrearGuia.conDatos(guiaCaracteresEspeciales).performAs(juan);

  await ConsultarGuia.conId(id, {
    referenciaRecaudo: guiaCaracteresEspeciales.referenciaRecaudo,
    valorRecaudar: guiaCaracteresEspeciales.valorRecaudar,
  }).performAs(juan);
  
}); 

test('Creación exitosa omitiendo campo observaciones y Consulta De guia', async () => {
  const api = await CallApiWithToken.usingToken();
  const juan = new Actor('Juan').whoCan(api);

  const id = await CrearGuia.conDatos(guiaOmitiendoCampo).performAs(juan);

  await ConsultarGuia.conId(id, {
    referenciaRecaudo: guiaOmitiendoCampo.referenciaRecaudo,
    valorRecaudar: guiaOmitiendoCampo.valorRecaudar,
  }).performAs(juan);
  
});


})




