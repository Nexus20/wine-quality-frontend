import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {AuthState} from "../../users/states/auth.state";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Logout} from "../../users/states/auth.action";
import {ClearProfile} from "../../profile/state/profile.actions";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private readonly aspUrl = environment.api;

    constructor(private store: Store, private jwtHelper: JwtHelperService, private router: Router) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.match(this.aspUrl)) {
            const token = this.store.selectSnapshot(AuthState.token);

            if (token) {
                if(this.isTokenExpired(token)){
                    this.store.dispatch([new Logout(), new ClearProfile()]).subscribe(() => {
                        this.router.navigate(['/login']);
                    });
                } else {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
            }
        }

        return next.handle(request);
    }

    private isTokenExpired(token: string): boolean {
        return this.jwtHelper.isTokenExpired(token);
    }
}
