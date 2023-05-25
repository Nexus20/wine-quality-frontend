import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login, Logout} from "../states/auth.action";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ClearProfile, GetOwnProfile} from "../../profile/state/profile.actions";
import {MatDialog} from "@angular/material/dialog";
import {SessionExpiredModalComponent} from "../session-expired-modal/session-expired-modal.component";
import {AuthState} from "../states/auth.state";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public sighInForm!: FormGroup;
    public wrongCredentialsError!: string;
    private _destroy$: Subject<void> = new Subject<void>();
    private tokenExpirationTimer: any;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        private router: Router,
        private dialog: MatDialog,
        private jwtHelper: JwtHelperService
    ) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    public submitForm(): void {

        if (!this.sighInForm.valid) {
            return;
        }

        this.store.dispatch(new Login(this.sighInForm.value))
            .pipe(takeUntil(this._destroy$))
            .subscribe({
                next: () => {
                    this.store.dispatch(new GetOwnProfile()).subscribe(() => {

                        if (this.tokenExpirationTimer) {
                            clearTimeout(this.tokenExpirationTimer);
                        }

                        const token = this.store.selectSnapshot(AuthState.token);
                        const expirationDate = this.jwtHelper.getTokenExpirationDate(token)!;
                        const timeout = expirationDate.getTime() - new Date().getTime();
                        this.tokenExpirationTimer = setTimeout(() => {
                            // Действия при истечении токена
                            // Здесь вы можете показать модальное окно или сразу выйти
                            this.store.dispatch([new Logout(), new ClearProfile()]).subscribe(() => {

                                const dialogRef = this.dialog.open(SessionExpiredModalComponent);

                                dialogRef.afterClosed().subscribe(result => {
                                    if (result) {
                                        this.router.navigate(['/users/login']);
                                    }
                                });

                            });
                        }, timeout);

                        this.router.navigateByUrl('/');
                    });
                }, error: (error) => {
                    if (error.message) {
                        this.wrongCredentialsError = error.message;
                        this.sighInForm.controls['password'].setErrors({wrongCred: true});
                    }
                }
            });

        // this.store.dispatch([new Login(this.sighInForm.value), new GetOwnProfile()])
        //     .pipe(takeUntil(this._destroy$))
        //     .subscribe({
        //         next: () => {
        //             this.router.navigateByUrl('/');
        //         }, error: (error) => {
        //             if (error.message) {
        //                 this.wrongCredentialsError = error.message;
        //                 this.sighInForm.controls['password'].setErrors({wrongCred: true});
        //             }
        //         }
        //     });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    private initForm(): void {
        this.sighInForm = this.formBuilder.group({
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            password: this.formBuilder.control('', [Validators.required])
        });
    }
}
