import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../users.service";
import {IUserResult} from "../models/IUserResult";


@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent {
    constructor(private dialogRef: MatDialogRef<UserDeleteModalComponent>,
                private usersService: UsersService,
                @Inject(MAT_DIALOG_DATA) public data: IUserResult) {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.usersService.delete(this.data.id).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
}
