/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDataObjectComponent } from './activity-data-object.component';


describe('ActivityDataObjectComponent', () => {
  let component: ActivityDataObjectComponent;
  let fixture: ComponentFixture<ActivityDataObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDataObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDataObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
