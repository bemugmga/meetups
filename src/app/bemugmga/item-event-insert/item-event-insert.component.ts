import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-event-insert',
  templateUrl: './item-event-insert.component.html',
  styleUrls: ['./item-event-insert.component.scss']
})
export class ItemEventInsertComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      dtEvent: [null, Validators.required],
      hour: null,
      where: null,
    });
  }

  ngOnInit() {
  }

  openCalendar(item) {
    item.open();
  }
}
