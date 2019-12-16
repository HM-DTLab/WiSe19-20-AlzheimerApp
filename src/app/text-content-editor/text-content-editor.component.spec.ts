import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextContentEditorComponent } from './text-content-editor.component';

describe('TextContentEditorComponent', () => {
  let component: TextContentEditorComponent;
  let fixture: ComponentFixture<TextContentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextContentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
