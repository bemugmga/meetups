import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PublicGitService } from 'src/app/services/public-git.service';
import { GitAccessService } from 'src/app/services/git-access.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-theme-insert',
  templateUrl: './item-theme-insert.component.html',
  styleUrls: ['./item-theme-insert.component.scss']
})
export class ItemThemeInsertComponent implements OnInit {

  public form: FormGroup;
  public noRequest = true;

  constructor(private dialogRef: MatDialogRef<ItemThemeInsertComponent>, private formBuilder: FormBuilder,
              private gitService: PublicGitService, private zone: NgZone,
              private gitUser: GitAccessService, @Inject(MAT_DIALOG_DATA) public data) {
    this.form = formBuilder.group({
      title: [null, Validators.required],
      name: [null, Validators.required],
      level: [null, Validators.required],
      time: [null, Validators.required],
      abstract: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.form.get('name').setValue(this.gitUser.getUser());
  }

  addNewTheme() {
    if (this.form.valid && this.noRequest) {
      this.zone.run(() => {
        this.noRequest = false;
      });
      const values = this.form.value;
      const data = {
        body: '## ' + values.title +
        '\n\r' +
        '\n\r#### Nome' +
        '\n\r' + values.name +
        '\n\r#### Grau da palestra' +
        '\n- [' + (values.level === 'iniciante' ? 'X' : ' ') + '] Iniciante' +
        '\n- [' + (values.level === 'intermediario' ? 'X' : ' ') + '] Intermediário' +
        '\n- [' + (values.level === 'avancado' ? 'X' : ' ') + '] Avançado' +
        '\n\r\n\r#### Tempo previsto' +
        '\n\r' + values.time +
        '\n\r#### Abstract' +
        '\n\r' + values.abstract};
      this.gitService.addComment(environment.repoBemug, this.data.number, data).subscribe(suc => {
        this.zone.run(() => {
          this.noRequest = true;
          this.dialogRef.close(true);
        });
      }, error => {
        this.zone.run(() => {
          this.noRequest = true;
        });
        alert('Ocorreu ao tentar inserir o tema');
        console.log(error);
      });
    }
  }

}
