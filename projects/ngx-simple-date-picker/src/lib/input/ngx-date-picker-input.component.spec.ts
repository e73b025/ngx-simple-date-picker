import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatePickerInputComponent } from './ngx-date-picker-input.component';

describe('NgxDatePickerInputComponent', () => {
  let component: NgxDatePickerInputComponent;
  let fixture: ComponentFixture<NgxDatePickerInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxDatePickerInputComponent]
    });
    fixture = TestBed.createComponent(NgxDatePickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
