import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextContentButtonComponent } from './text-content-button.component';

describe('TextContentButtonComponent', () => {
  let component: TextContentButtonComponent;
  let fixture: ComponentFixture<TextContentButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextContentButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextContentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
