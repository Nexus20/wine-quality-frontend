import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {ChartModel, EcgChartModel} from "../models/ChartModel";
import {environment} from "../../../environments/environment";
import {EcgPointModel} from "../models/EcgPointModel";

@Injectable({
    providedIn: 'root'
})
export class SignalrService {

    public data!: ChartModel[];
    public ecgData: EcgPointModel[] = [];
    public ecgData2: EcgChartModel[] = [];
    private hubConnection!: signalR.HubConnection
    private api = environment.api;

    constructor() {
    }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7088/health-measurements')
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    public addTransferChartDataListener = () => {
        this.hubConnection.on('transferchartdata', (data) => {
            this.data = data;
            console.log(data);
        });
    }

    public addTransferEcgDataListener = () => {
        this.hubConnection.on('transferecgdata', (data) => {
            this.ecgData.push(data);
            this.ecgData2.push({backgroundColor: "#5491DA", data: data.x, label: data.y})
            // console.log(this.ecgData);
            // console.log(this.ecgData2);
        });
    }
}
