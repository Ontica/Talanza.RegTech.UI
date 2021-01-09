import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivityDataObjectsListComponent } from './activity-data-objects-list.component';

describe('ActivityDataObjectsListComponent', () => {
  let component: ActivityDataObjectsListComponent;
  let fixture: ComponentFixture<ActivityDataObjectsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDataObjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDataObjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
