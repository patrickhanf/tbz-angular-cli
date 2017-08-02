//
// https://stackoverflow.com/questions/41684114/angular-2-easy-way-to-make-a-confirmation-dialog
// https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41
//
import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-ok', // must not contain . periods it will not show
    template: `
      <h1 md-dialog-title> {{ title }}</h1>
      <div md-dialog-content> {{ message }} </div>
      <div md-dialog-actions align="end">
        <button md-button color="primary" (click)="dialogRef.close(true)">OK</button>
      </div>
    `,
})
export class DialogOK {
  public title: string = "Confirm";
  public message: string;
  constructor(public dialogRef: MdDialogRef<DialogOK>) {
  }

}