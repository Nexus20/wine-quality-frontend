import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {catchError} from 'rxjs/operators';
import {ErrorModalComponent} from "../../shared/error-modal/error-modal.component";

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {

                const error = err.error ? {
                    message: err.error.errorMessage,
                } : {message: err.errorMessage};

                if (err.status === 401) {
                    // Do some code
                }

                const dialogRef = this.dialog.open(ErrorModalComponent, {
                    data: {
                        message: err.error
                    }
                });

                return throwError(() => error);
            }));
    }
}
