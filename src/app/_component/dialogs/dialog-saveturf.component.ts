//
// https://stackoverflow.com/questions/41684114/angular-2-easy-way-to-make-a-confirmation-dialog
//
import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-saveturf',
  templateUrl: 'dialog-saveturf.html',
  styles: []
})
export class DialogSaveTurf {
  public turfName: string;
  constructor(public dialogRef: MdDialogRef<DialogSaveTurf>) {

  }

}
