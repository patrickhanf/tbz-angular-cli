import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { DialogOK } from './dialog-ok.component';
import { DialogConfirm } from './dialog-confirm.component';


@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<DialogConfirm>;

        dialogRef = this.dialog.open(DialogConfirm);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();  // OK | Cancel
    }

    public ok(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<DialogOK>;

        dialogRef = this.dialog.open(DialogOK);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed(); // Popup OK only
    }
}