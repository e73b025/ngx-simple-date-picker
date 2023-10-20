import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxDatePickerUiComponent } from './ngx-date-picker-ui.component';

describe('NgxDatePickerComponent', () => {
  let component: NgxDatePickerUiComponent;
  let fixture: ComponentFixture<NgxDatePickerUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxDatePickerUiComponent]
    });
    fixture = TestBed.createComponent(NgxDatePickerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
