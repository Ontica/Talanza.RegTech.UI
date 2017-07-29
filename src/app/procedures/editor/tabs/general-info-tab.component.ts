import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Procedure } from '../../data-types/procedure';
import { Office } from '../../data-types/office';
import { Entity } from '../../data-types/entity';
import { Position } from '../../data-types/position';

import { ProcedureService } from '../../services/procedure.service';
import { AuthorityService } from '../../services/authority.service';

@Component({
  selector: 'general-info-tab',
  templateUrl: './general-info-tab.component.html',
  styleUrls: ['./general-info-tab.component.scss'],
  providers: [ProcedureService, AuthorityService]
})

export class GeneralInfoTabComponent implements OnInit {

  @Output() public isEditable = new EventEmitter<boolean>();
  @Output() public onCancel = new EventEmitter();
  @Input() public procedure: Procedure;

  public addButtonLabel = '';
  public offices: Office[] = [];
  public entities: Entity[] = [];
  public positions: Position[] = [];
  public isNewProcedure = false;
  public disabled = true;

  constructor(private procedureService: ProcedureService, private authorityService: AuthorityService) { }

  public ngOnInit() {
    this.setProcedureStatus();
    this.setInitialValues();
  }

  public cancel() {
    this.onCancel.emit();
  }

  public async discardChanges() {
    await this.setProcedure();
    this.setInitialValues();
    this.isEditable.emit(false);
  }

  public editProcedure(): void {
    this.disabled = false;
    this.isEditable.emit(true);
  }

  public onChangeEntity(entityUID: string) {
    this.setOffices(entityUID);
    this.setPositions(entityUID);
    this.procedure.authority.office.uid = '';
    this.procedure.authority.position.uid = '';
    this.procedure.authority.contact.name = '';
    this.procedure.authority.contact.email = '';
    this.procedure.authority.position.phone = '';
  }

  public onChangePosition(positionUID: string): void {
    if (positionUID === '') {
      return;
    }
    const position = this.positions.find((x) => x.uid === positionUID);

    this.procedure.authority.position.phone = position.phone;
    this.procedure.authority.contact.name = position.officer.name;
    this.procedure.authority.contact.email = position.officer.email;
  }

  public async saveProcedureChanges() {
    if (!this.validation()) {
      return;
    }
    if (this.isNewProcedure) {
      await this.createNewProcedure();
      alert('El trámite se agregó correctamente al sistema.');
    } else {
      this.updateProcedure();
      alert('El trámite se actualizó correctamente.');
    }
    this.disabled = true;
    this.isEditable.emit(false);
  }

  private setInitialValues(): void {
    this.setEntities();
    if (!this.isNewProcedure) {
      this.setOffices(this.procedure.authority.entity.uid);
      this.setPositions(this.procedure.authority.entity.uid);
      this.addButtonLabel = 'Guardar cambios';
    } else {
      this.addButtonLabel = 'Agregar trámite';
    }

  }

  private setEntities(): void {
    this.authorityService.getEntities().then((entities) => {
      this.entities = entities;
    });
  }

  private async setOffices(entityUID: string) {
    await this.authorityService.getEntity(entityUID).then((entity) => {
      this.offices = entity.offices;
    });
  }

  private setPositions(entityUID: string) {
    this.authorityService.getEntity(entityUID).then((entity) => {
      this.positions = entity.positions;
    });
  }

  private async setProcedure() {
    await this.procedureService.getProcedure(this.procedure.uid).then((procedure) => {
      this.procedure = procedure;
    });
  }

  private setProcedureStatus(): void {
    if (this.procedure.uid === '') {
      this.isNewProcedure = true;
      this.disabled = false;
    }
  }

  private updateProcedure(): void {
    this.procedureService.updateProcedure(this.procedure).then((procedure) => {
      this.procedure = procedure;
    });
  }

  private async createNewProcedure() {
    let newProcedure = await this.procedureService.createProcedure(this.procedure);
    this.procedure.uid = newProcedure.uid;
  }

  private validation(): boolean {
    if (this.procedure.name === '') {
      alert('El nombre del trámite se encuentra en blanco.');
      return false;
    }
    if (this.procedure.legalInfo.regulationStatus === '') {
      alert('Requiero saber la forma en que está regulado el trámite.');
      return false;
    }
    if (this.procedure.stage === '') {
      alert('Seleccionar una etapa de la lista.');
      return false;
    }
    if (this.procedure.theme === '') {
      alert('Seleccionar un tema de la lista.');
      return false;
    }
    if (this.procedure.authority.entity.uid === '') {
      alert('Seleccionar una dependencia de la lista.');
      return false;
    }
    return true;
  }

}
