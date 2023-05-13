import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login} from "../states/auth.action";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {GetOwnProfile} from "../../profile/state/profile.actions";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public sighInForm!: FormGroup;
    public wrongCredentialsError!: string;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        private router: Router
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
