/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportActivitiesDialogComponent } from './export-activities-dialog.component';


describe('ExportActivitiesDialogComponent', () => {
  let component: ExportActivitiesDialogComponent;
  let fixture: ComponentFixture<ExportActivitiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportActivitiesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportActivitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
