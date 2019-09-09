import { Component,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GitAccessService } from 'src/app/services/git-access.service';
import { PublicGitService } from 'src/app/services/public-git.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent  {

   constructor(@Inject(MAT_DIALOG_DATA) public theme, private gitService: PublicGitService) {}

   voteIssue() {

   }

}
