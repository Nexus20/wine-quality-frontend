import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IUserResult} from "../models/IUserResult";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent {

    editForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<UserEditModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IUserResult,
                private usersService: UsersService) {
        this.editForm = new FormGroup({
            firstName: new FormControl(data.firstName, Validators.required),
            lastName: new FormControl(data.lastName, Validators.required),
            phone: new FormControl(data.phone, Validators.required),
        });
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    editUser(): void {

        if (this.editForm.valid) {

            const updatedUser = {
                Id: this.data.id,
                FirstName: this.editForm.value.firstName,
                LastName: this.editForm.value.lastName,
                Phone: this.editForm.value.phone,
            };

            this.usersService.update(updatedUser).subscribe(() => {
                this.dialogRef.close(updatedUser);
            });
        }
    }
}
