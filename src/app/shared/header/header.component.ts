import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AuthState} from "../../users/states/auth.state";
import {Logout} from "../../users/states/auth.action";
import {ClearProfile} from "../../profile/state/profile.actions";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isUserAuthenticated!: boolean;
    public isUserAdmin!: boolean;

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit(): void {
        const token = this.store.selectSnapshot(AuthState.token);

        if (!token) {
            this.isUserAdmin = false;
            this.isUserAuthenticated = false;
            return;
        }

        this.isUserAuthenticated = true;
        this.isUserAdmin = this.store.selectSnapshot(AuthState.isAdmin);
        this.isUserAuthenticated = true;
    }

    logout() {
        this.store.dispatch([new Logout(), new ClearProfile()]).subscribe(() => {
            this.isUserAdmin = false;
            this.router.navigate(['/']);
            location.reload();
        });
    }
}
