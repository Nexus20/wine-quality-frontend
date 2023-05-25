import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ProfileState} from "../../profile/state/profile.state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public userFullName!: string;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        const userProfile = this.store.selectSnapshot(ProfileState.selectProfile);
        if(!userProfile?.firstName) {
            this.userFullName = "Guest"
        } else {
            this.userFullName = `${userProfile?.lastName} ${userProfile?.firstName}`;
        }
    }
}
