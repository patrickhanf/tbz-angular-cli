//
// https://stackoverflow.com/questions/41684114/angular-2-easy-way-to-make-a-confirmation-dialog
//
import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'dialog.confirm',
  templateUrl: './dialog-confirm.html',
  styles: []
})
export class DialogConfirmation {
  public okbutton: boolean = false;
  public confirmMessage: string;
  public confirmHeader: string = "Confirm";
  constructor(public dialogRef: MdDialogRef<DialogConfirmation>) {

  }

}