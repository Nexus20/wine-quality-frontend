import {Component, OnInit} from '@angular/core';
import {IUserResult} from "../../users/models/IUserResult";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../users/users.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

    profile!: IUserResult;
    editForm!: FormGroup;

    constructor(private activatedRoute: ActivatedRoute,
                private usersService: UsersService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({profile}) => {
            this.profile = profile;

            this.editForm = new FormGroup({
                firstName: new FormControl(profile.firstName, Validators.required),
                lastName: new FormControl(profile.lastName, Validators.required),
                phone: new FormControl(profile.phone, Validators.required),
            });
        })
    }

    editProfile(): void {

        if (this.editForm.valid) {

            const updatedUser = {
                FirstName: this.editForm.value.firstName,
                LastName: this.editForm.value.lastName,
                Phone: this.editForm.value.phone,
            };

            this.usersService.updateOwnProfile(updatedUser).subscribe(() => {
                this.router.navigate(['/profile']);
            });
        }
    }
}
