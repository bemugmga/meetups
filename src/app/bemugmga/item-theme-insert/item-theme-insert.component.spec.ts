import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemThemeInsertComponent } from './item-theme-insert.component';

describe('ItemThemeInsertComponent', () => {
  let component: ItemThemeInsertComponent;
  let fixture: ComponentFixture<ItemThemeInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemThemeInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemThemeInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
