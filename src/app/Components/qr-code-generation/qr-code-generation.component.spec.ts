import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeGenerationComponent } from './qr-code-generation.component';

describe('QrCodeGenerationComponent', () => {
  let component: QrCodeGenerationComponent;
  let fixture: ComponentFixture<QrCodeGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
