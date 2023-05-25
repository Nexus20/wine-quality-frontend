import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IUserResult} from "../models/IUserResult";

@Component({
    selector: 'app-user-details-modal',
    templateUrl: './user-details-modal.component.html',
    styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent {
    constructor(private dialogRef: MatDialogRef<UserDetailsModalComponent>,
                @Inject(MAT_DIALOG_DATA) public userDetail: IUserResult) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
