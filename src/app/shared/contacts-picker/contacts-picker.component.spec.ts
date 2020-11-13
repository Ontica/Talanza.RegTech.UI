import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsPickerComponent } from './contacts-picker.component';

describe('ContactsPickerComponent', () => {
  let component: ContactsPickerComponent;
  let fixture: ComponentFixture<ContactsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
