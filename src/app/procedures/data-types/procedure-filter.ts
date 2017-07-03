import { Entity } from './entity';
import { Authority } from './authority';

export class ProcedureFilter {
  public authority: string;
  public entity: string;
  public theme: string;
  public stage: string;

  constructor() {
    this.clean();
  }

  public clean(): void {
    this.authority = '';
    this.entity = '';
    this.theme = '';
    this.stage = '';
  }

}
