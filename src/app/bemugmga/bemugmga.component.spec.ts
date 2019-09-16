import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BemugmgaComponent } from './bemugmga.component';

describe('BemugmgaComponent', () => {
  let component: BemugmgaComponent;
  let fixture: ComponentFixture<BemugmgaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BemugmgaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BemugmgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
