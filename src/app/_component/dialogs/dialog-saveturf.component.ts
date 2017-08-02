//
// https://stackoverflow.com/questions/41684114/angular-2-easy-way-to-make-a-confirmation-dialog
//
import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dialog-saveturf',
  templateUrl: 'dialog-saveturf.html',
  styles: []
})
export class DialogSaveTurf {
  //  disableClose: false
  public myForm: FormGroup;
  public turf: string;
  public submitted: boolean; // keep track on whether form is submitted
  constructor(public dialogRef: MdDialogRef<DialogSaveTurf>, private formbuilder: FormBuilder) {

  }
  ngOnInit() {

    // the short way
    this.myForm = this.formbuilder.group({
      turf: ['test', [<any>Validators.required, <any>Validators.minLength(5)]]
    });

  }
  save() {
    
    if (!this.myForm.valid)
      return;

    // console.log('name=' + this.turf + ' valid?' + this.myForm.valid);

    this.submitted = true; // set form submit to true

    this.dialogRef.close(this.turf);
  }
}
