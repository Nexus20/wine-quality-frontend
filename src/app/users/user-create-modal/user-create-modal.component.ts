import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../users.service";
import {RolesService} from "../../roles/services/roles.service";
import {IRoleResult} from "../../roles/models/role.result";

@Component({
    selector: 'app-user-create-modal',
    templateUrl: './user-create-modal.component.html',
    styleUrls: ['./user-create-modal.component.scss']
})
export class UserCreateModalComponent {

    createForm: FormGroup;
    roles: IRoleResult[] = [];

    constructor(private dialogRef: MatDialogRef<UserCreateModalComponent>,
                private usersService: UsersService,
                private formBuilder: FormBuilder,
                private rolesService: RolesService) {
        this.createForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: ['', Validators.required],
            rolesIds: ['', Validators.required]
        });

        this.rolesService.get().subscribe((roles) => {
            this.roles = roles;
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    createUser(): void {
        if (this.createForm.valid) {
            this.usersService.create(this.createForm.value).subscribe((newUser) => {
                this.dialogRef.close(newUser);
            });
        }
    }
}
