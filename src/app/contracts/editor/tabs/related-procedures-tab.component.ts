import { Component, Input, OnInit } from '@angular/core';

import { ContractService } from '../../services/contract.service';
import { ContractClause, RelatedProcedure, EmptyRelatedProcedures } from '../../data-types/contract';

import { Entity } from '../../../procedures/data-types/entity';
import { SmallProcedureInterface } from '../../../procedures/data-types/small-procedure.interface';
import { KeyValue } from '../../../core/core-data-types';

import { AuthorityService } from '../../../procedures/services/authority.service';
import { ProcedureService } from '../../../procedures/services/procedure.service';
import { CataloguesService } from '../../../common-services';

@Component({
  selector: 'related-procedures-tab',
  templateUrl: './related-procedures-tab.component.html',
  styleUrls: ['./related-procedures-tab.component.scss'],
  providers: [AuthorityService, ProcedureService, CataloguesService]
})

export class RelatedProceduresTabComponent implements OnInit {

  @Input() public contractClause: ContractClause;

  public relatedProcedures: RelatedProcedure[];
  public entities: Entity[] = [];
  public procedures: SmallProcedureInterface[] = [];
  public timeValueTypesList: KeyValue[] = [];
  public startsWhenList: KeyValue[] = [];

  public relatedProcedure = EmptyRelatedProcedures();
  public isDiabledTextBoxMaxFilingTerm = true;
  public isAddRelatedProcedureEditorVisible = false;

  private entityUID = '';
  private procedureUID = '';

  constructor(private contractService: ContractService,
              private authorityService: AuthorityService,
              private procedureService: ProcedureService,
              private cataloguesService: CataloguesService) { }

  public ngOnInit() {
    this.updateRelatedProceduresGrid();
    this.loadEntitiesList();
    this.loadTimeValueTypesList();
    this.loadStartsWhenList();
    this.clean();
  }

  public onShowAddProcedureEditor(): void {
    this.isAddRelatedProcedureEditorVisible = true;
  }

  public onChangeEntity(entityUID: string): void {
    if (entityUID !== '') {
      this.loadProceduresList(entityUID);
    }
    this.entityUID = entityUID;
  }

  public onChangeProcedure(procedureUID: string): void {
    if (procedureUID !== '') {
      this.relatedProcedure.procedure.uid = procedureUID;
    }
    this.procedureUID = procedureUID;
  }

  public onChangeMaxFilingTermType(): void {
    if ((this.relatedProcedure.maxFilingTermType !== 'No determinado')
      && (this.relatedProcedure.maxFilingTermType !== 'No aplica')) {
      this.isDiabledTextBoxMaxFilingTerm = false;
    } else {
      this.isDiabledTextBoxMaxFilingTerm = true;
    }
  }

  public onClickCancelAddProcedure(): void {
    this.isAddRelatedProcedureEditorVisible = false;
  }

  public async onClickAddRelatedProcedure() {
    if (!this.validate()) {
      return;
    }

    await this.addRelatedProcedure();
    await this.updateRelatedProceduresGrid();

    this.clean();
    this.isAddRelatedProcedureEditorVisible = false;
  }

  public async updateRelatedProceduresGrid() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de trámites relacionados.';

    await this.contractService.getClause(this.contractClause.contract.uid,
                                         this.contractClause.uid)
                              .then((clause) => this.relatedProcedures = clause.relatedProcedures)
                              .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private async addRelatedProcedure() {
    const errMsg = 'Ocurrió un problema al intentar agregar el trámite.';

    await this.contractService.addRelatedProcedure(this.contractClause.contract.uid,
                                                   this.contractClause.uid,
                                                   this.relatedProcedure)
                              .then(() => alert('El trámite se ha agregado a la claúsula.'))
                              .catch((e) => this.exceptionHandler(e, errMsg));

  }

  private loadEntitiesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de trámites.';

    this.authorityService.getEntities()
                         .then((entities) => { this.entities = entities; })
                         .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadProceduresList(entityUID: string): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de trámites.';

    this.procedureService.getProceduresList("AuthEntityUID='" + entityUID + "'")
                         .then((procedures) => { this.procedures = procedures; })
                         .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadTimeValueTypesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de plazos.';

    this.cataloguesService.getTermTimeUnitsList()
                          .then((list) => this.timeValueTypesList = list)
                          .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadStartsWhenList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de plazos.';

    this.cataloguesService.getStartsWhenList()
                          .then((list) => this.startsWhenList = list)
                          .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private validate(): boolean {
    if (this.entityUID === '') {
      alert('Seleccionar una entidad de la lista.');
      return false;
    }
    if (this.procedureUID === '') {
      alert('Seleccionar un trámite de la lista.');
      return false;
    }
    if (this.relatedProcedure.maxFilingTermType === '') {
      alert('Selecionar un plazo de la lista.');
      return false;
    }
    if ((!this.relatedProcedure.maxFilingTerm) &&
      ((this.relatedProcedure.maxFilingTermType !== 'Unknown') &&
        (this.relatedProcedure.maxFilingTermType !== 'NA'))) {

      alert('La cantidad de: ' + this.relatedProcedure.maxFilingTermType + ' se encuntra en blanco.');
      return false;
    }
    if (this.relatedProcedure.startsWhen === '') {
      alert('Seleccinar la condición de inicio de la lista.');
      return false;
    }
    if (this.relatedProcedure.startsWhenTrigger === '') {
      alert('seleccionar la actividad o evento de la lista');
      return false;
    }

    return true;
  }

  private clean(): void {
    this.entityUID = '';
    this.procedureUID = '';
    this.relatedProcedure = EmptyRelatedProcedures();
  }

  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error> error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

}
