import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckProcessesDialogComponent } from './check-processes-dialog.component';

describe('CheckProcessesDialogComponent', () => {
  let component: CheckProcessesDialogComponent;
  let fixture: ComponentFixture<CheckProcessesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckProcessesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckProcessesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
