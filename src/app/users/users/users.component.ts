import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUserResult} from "../models/IUserResult";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../users.service";
import {UserDetailsModalComponent} from "../user-details-modal/user-details-modal.component";
import {UserDeleteModalComponent} from "../user-delete-modal/user-delete-modal.component";
import {UserEditModalComponent} from "../user-edit-modal/user-edit-modal.component";
import {UserCreateModalComponent} from "../user-create-modal/user-create-modal.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: IUserResult[] = [];
    displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'createdAt', 'updatedAt', 'actions'];

    constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({users}) => {
            this.users = users;
        })
    }

    openDetailsDialog(userId: string): void {
        this.usersService.getById(userId).subscribe(userDetail => {
            this.dialog.open(UserDetailsModalComponent, {data: userDetail});
        });
    }

    openDeleteDialog(user: IUserResult): void {
        const dialogRef = this.dialog.open(UserDeleteModalComponent, {
            data: user
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openEditDialog(user: IUserResult): void {
        const dialogRef = this.dialog.open(UserEditModalComponent, {data: user});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(UserCreateModalComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    refreshData(): void {
        this.usersService.get().subscribe((users) => {
            this.users = users;
        })
    }
}
