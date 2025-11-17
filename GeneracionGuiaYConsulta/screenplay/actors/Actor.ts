import { CallApiWithToken } from '../abilities/CallApiWithToken';

export class Actor {
  constructor(private name: string, private abilities: any = {}) {}

  whoCan(ability: any) {
    this.abilities[ability.constructor.name] = ability;
    return this;
  }

  abilityTo<T>(AbilityType: { name: string }): T {
    return this.abilities[AbilityType.name];
  }

  async attemptsTo(...tasks: Array<{ performAs: (actor: Actor) => Promise<any> }>) {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }
}
