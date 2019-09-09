import { Component,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PublicGitService } from 'src/app/services/public-git.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent  {

   constructor( @Inject(MAT_DIALOG_DATA) public theme,
                private gitService: PublicGitService,
                private dialogRef: MatDialogRef<ItemDialogComponent>) {

    console.log(theme);

   }

   voteIssue() {
    this.gitService.voteReaction(environment.repoBemug, this.theme.id).subscribe(suc => {
        this.dialogRef.close(true);
    }, error => {
      alert('Ocorreu um erro ao tentar votar');
      console.log(error);
    });
   }

}
