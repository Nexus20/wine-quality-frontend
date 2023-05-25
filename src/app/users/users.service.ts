import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILoginResponse} from "./models/ILoginResponse";
import {IUserResult} from "./models/IUserResult";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public login(email: string, password: string): Observable<ILoginResponse> {
        return this.httpClient.post<ILoginResponse>(`${this.api}auth/login`, {
            email, password
        });
    }

    public create(payload: any): Observable<IUserResult> {
        return this.httpClient.post<IUserResult>(`${this.api}user`, payload);
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

    public delete(id: string) {
        return this.httpClient.delete(`${this.api}user/${id}`);
    }

    public update(userToUpdate: { FirstName: any; Phone: any; Id: string; LastName: any }) {
        return this.httpClient.put(`${this.api}user/${userToUpdate.Id}`, userToUpdate);
    }

    public updateOwnProfile(userToUpdate: { FirstName: any; Phone: any; LastName: any }) {
        return this.httpClient.put(`${this.api}profile`, userToUpdate);
    }
}
