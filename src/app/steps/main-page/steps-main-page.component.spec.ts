import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsMainPageComponent } from './steps-main-page.component';

describe('StepsMainPageComponent', () => {
  let component: StepsMainPageComponent;
  let fixture: ComponentFixture<StepsMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
