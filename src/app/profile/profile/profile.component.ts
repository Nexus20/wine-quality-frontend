import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUserResult} from "../../users/models/IUserResult";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    profile!: IUserResult;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({profile}) => {
            this.profile = profile;
        })
    }
}
