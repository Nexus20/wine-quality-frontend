import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILoginResponse} from "./models/ILoginResponse";
import {IUserResult} from "./models/IUserResult";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public login(email: string, password: string): Observable<ILoginResponse> {
        return this.httpClient.post<ILoginResponse>(`${this.api}auth/login`, {
            email, password
        });
    }

    public register(payload: { firstname: string, lastname: string, phone: string, email: string, password: string, confirmPassword: string }): Observable<IUserResult> {
        return this.httpClient.post<IUserResult>(`${this.api}auth/register`, payload);
    }

    public getOwnProfile() {
        return this.httpClient.get<IUserResult>(`${this.api}profile`);
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IUserResult[]>(`${this.api}user`, {params: queryParams});
    }

    public getById = (id: string) => {
        return this.httpClient.get<IUserResult>(`${this.api}user/${id}`);
    }

    public setLanguage(id: string, newLanguage: string) {
        return this.httpClient.patch(`${this.api}user/${id}/set_language`, {newLanguage: newLanguage});
    }
}
