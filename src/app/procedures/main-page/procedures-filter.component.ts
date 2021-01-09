/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { EntityService, ProcedureService } from '@app/data-services/regulation';

import { BaseProcedure, Entity, Office, ProcedureFilter } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-procedure-filter',
  templateUrl: './procedures-filter.component.html',
  styleUrls: ['../../../styles/general-styles.scss']
})
export class ProcedureFilterComponent implements OnInit {

  filter = new ProcedureFilter();

  offices: Office[] = [];
  entities: Entity[] = [];
  themesList: string[] = [];

  @Output() procedureFilterChange = new EventEmitter<BaseProcedure[]>();


  constructor(private procedureService: ProcedureService,
              private authorityService: EntityService) { }


  ngOnInit() {
    this.setEntities();
    this.setThemesList();
    this.onChangeFilter();
  }


  onChangeFilter() {
    this.procedureService.getProceduresList(this.filter)
                         .then(x => this.procedureFilterChange.emit(x));
  }


  onCleanCombos() {
    this.filter.clean();
    this.procedureFilterChange.emit([]);
  }


  private setEntities(): void {
    this.authorityService.getEntities()
                         .then(x => this.entities = x);
  }


  private setThemesList(): void {
    this.procedureService.getThemes()
                         .toPromise()
                         .then(x => this.themesList = x);
  }

}
