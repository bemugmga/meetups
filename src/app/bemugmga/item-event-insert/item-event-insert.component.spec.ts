import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEventInsertComponent } from './item-event-insert.component';

describe('ItemEventInsertComponent', () => {
  let component: ItemEventInsertComponent;
  let fixture: ComponentFixture<ItemEventInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEventInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEventInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
