import { Actor } from '../actors/Actor';
import { CallApiWithToken } from '../abilities/CallApiWithToken';
import test, { expect } from '@playwright/test';

export class ConsultarGuia {
  static conId(id: string, datosEsperados: Partial<any>) {
    return new ConsultarGuia(id, datosEsperados);
  }

  private constructor(
    private readonly id: string,
    private readonly esperado: Partial<any>
  ) {}

  async performAs(actor: Actor): Promise<void> {
    const api = (actor.abilityTo(CallApiWithToken) as CallApiWithToken).context();

    const response = await api.get(`/guias/${this.id}`);
    await test.step('Se valida que el estado de respuesta del GET sea 200 OK', async () => {
      expect(response.status()).toBe(200);
    })
    

    const body = await response.json();
    const detalle = body.data.detalle;
    console.log(detalle);

    console.log('📦 Respuesta del GET /guias/{id}:', JSON.stringify(body, null, 2));

    // Validaciones de integridad
    await test.step('Se valida que el campo referenciaRecaudo tenga el mismo valor que se envio', async () => {
      expect(body.data.referenciaRecaudo).toBe(this.esperado.referenciaRecaudo);
    })

    await test.step('Se valida que el campo valorRecuadar tenga el mismo valor que se envio', async () => {
      expect(body.data.valorRecaudar).toBe(Number(this.esperado.valorRecaudar));
    })
    
    
    
    
    console.log('✅ Guía validada correctamente');
  }
}
