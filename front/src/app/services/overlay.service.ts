import { Component, Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Injectable({
    providedIn: "root"
})
export class OverlayService {

    constructor(private snackBar: MatSnackBar, private dialog:MatDialog ) { }

    showToast(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 3000
          });
    }


    showDialog(component: any, data:any){
        return this.dialog.open(component, {data});
    }



}