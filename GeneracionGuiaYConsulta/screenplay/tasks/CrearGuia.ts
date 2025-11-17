import { Actor } from '../actors/Actor';
import { CallApiWithToken } from '../abilities/CallApiWithToken';


export class CrearGuia {
  static conDatos(datos: object) {
    return new CrearGuia(datos);
  }

  private constructor(private datos: object) {}

  async performAs(actor: Actor): Promise<string> {
    const api = (actor.abilityTo(CallApiWithToken) as CallApiWithToken).context();
    const response = await api.post('/guias', { data: this.datos });

    const body = await response.json();

    console.log(body);
    
    const id = body.data.codigo_remision;

    if (!id) throw new Error('❌ No se obtuvo el ID de la guía creada');

    console.log('✅ Guía creada con ID:', id);
    return id;
  }
}
