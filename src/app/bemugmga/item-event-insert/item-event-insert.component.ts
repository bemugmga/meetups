import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicGitService } from 'src/app/services/public-git.service';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-item-event-insert',
  templateUrl: './item-event-insert.component.html',
  styleUrls: ['./item-event-insert.component.scss']
})
export class ItemEventInsertComponent implements OnInit {

  public form: FormGroup;
  public noRequest = true;

  constructor(private dialogRef: MatDialogRef<ItemEventInsertComponent>, private formBuilder: FormBuilder,
              private gitService: PublicGitService, private zone: NgZone) {
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

  addNewIssue() {
    if (this.form.valid && this.noRequest) {
      this.zone.run(() => {
        this.noRequest = false;
      });
      this.gitService.getAllIssues(environment.repoBemug).subscribe(suc => {
          let meetups = 1;
          if (suc.length > 0) {
            meetups = suc[0].number - 1;
          }
          const values = this.form.value;
          const data = {
            title: meetups + 'º Backend Meetup Group MGA',
            body: '# ' + meetups + 'º Backend Meetup Group MGA' +
            '\n\r ' + this.formatData(values.dtEvent) + ' | ' + (values.hour ? values.hour : 'A Definir') +
            ' - ' + (values.where ? values.where : 'A Definir') + ' ' +
            '\n\r ' +
            '\n\r ## Palestra ' +
            '\n\r Para submeter palestras comente nessa issue seguindo o modelo da issue #2 ' +
            '\n\r' +
            '\n\r ## Discussão ' +
            '\n\r Para sugerir temas, especifique que é uma sugestão de tema e faça sua sugestão. Exemplo: ' +
            '\n\r' +
            '\n\r ## Sugestão de tema ' +
            '\n\r {a sua sugestão} ' +
            '\n\r' +
            '\n\r Para tornar a votação democrática, as palestras/sugestões submetidas com mais +1 serão escolhidas para o encontro. ' +
            '\n\r Mesmo que a sua palestra/sugestão não for escolhida, fica o convite para que você submeta também nos próximos encontros.'
          };
          this.gitService.addIssue(environment.repoBemug, data).subscribe(sucess => {
              this.zone.run(() => {
                this.noRequest = true;
                this.dialogRef.close(true);
              });
          }, error => {
            this.zone.run(() => {
              this.noRequest = true;
            });
            console.log(error);
            alert('Ocorreu ao adicionar a nova issue');
          });
      }, error => {
        this.zone.run(() => {
          this.noRequest = true;
        });
        console.log(error);
        alert('Ocorreu um erro ao validar as issues');
      });
    }
  }

  private formatData(data: Date) {
      const dia  = data.getDate().toString();
      const mes  = (data.getMonth() + 1).toString();
      const anoF = data.getFullYear();
      return dia.padStart(2, '0') + '/' + mes.padStart(2, '0') + '/' + anoF;
  }

}
