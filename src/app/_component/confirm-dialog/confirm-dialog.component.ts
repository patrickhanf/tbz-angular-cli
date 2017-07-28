//
// https://stackoverflow.com/questions/41684114/angular-2-easy-way-to-make-a-confirmation-dialog
//
import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
  styles: []
})
export class ConfirmationDialog {
  constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) {}

  public okbutton:boolean = false;
  public confirmMessage:string;
  public confirmHeader:string = "Confirm";
}