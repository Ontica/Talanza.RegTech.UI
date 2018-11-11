/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { EntityService, ProcedureService } from '@app/services/regulation';

import { BaseProcedure, Entity, Office, ProcedureFilter } from '@app/models/regulation';


@Component({
  selector: 'procedure-filter',
  templateUrl: './procedures-filter.component.html',
  styleUrls: ['./procedures-filter.component.scss'],
  providers: [ProcedureService, EntityService]
})
export class ProcedureFilterComponent implements OnInit {

  filter = new ProcedureFilter();

  offices: Office[] = [];
  entities: Entity[] = [];

  @Output() onSearch = new EventEmitter<BaseProcedure[]>();
  @Output() onNewProcedure = new EventEmitter<string>();

  constructor(private procedureService: ProcedureService, private authorityService: EntityService) { }

  ngOnInit() {
    this.setEntities();
    this.search();
  }

  async onChangeFilter() {
    this.search();
  }

  newProcedure(): void {
    this.onNewProcedure.emit('');
  }

  cleanCombos(): void {
    this.filter.clean();
    this.onSearch.emit([]);
  }

  search(): void {
    this.procedureService.getProceduresList(this.filter)
                         .then((procedures) => this.onSearch.emit(procedures));
  }

  private setEntities(): void {
    this.authorityService.getEntities()
                         .then((entities) => this.entities = entities);
  }

  // private async setOffices(entityUID: string) {
  //   await this.authorityService.getEntity(entityUID)
  //                              .then((entity) => { this.offices = entity.offices; });
  //   this.filter.officeUID = '';
  // }

}
