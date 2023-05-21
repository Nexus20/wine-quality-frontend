import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SignalrService {

    hubConnection!: signalR.HubConnection
    private api = environment.api;

    constructor() {
    }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://192.168.0.111:7110/wine-quality')
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }
}
