import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";
import {BaseChartDirective} from "ng2-charts";
import {BubbleDataPoint, ChartOptions, Point} from "chart.js";
import {ChartDataset} from "chart.js/dist/types";
import {IWineMaterialBatchGrapeSortPhaseParameterDetailsResult} from "../models/wine-material-batch-details-result";
import {MatSelectChange} from "@angular/material/select";

@Component({
    selector: 'app-wine-material-batch-phase-parameter-chart-modal',
    templateUrl: './wine-material-batch-phase-parameter-chart-modal.component.html',
    styleUrls: ['./wine-material-batch-phase-parameter-chart-modal.component.scss']
})
export class WineMaterialBatchPhaseParameterChartModalComponent {


    public chartOptions: ChartOptions<'line'> = {
        responsive: true,
    };
    public chartLegend: boolean = true;

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    public chartTypes = [
        {value: 1000, viewValue: 'Hour'},
        {value: 2000, viewValue: 'Day'},
        {value: 3000, viewValue: 'Week'},
        {value: 4000, viewValue: 'Month'},
        {value: 5000, viewValue: 'Year'},
        {value: 6000, viewValue: 'All Time'},
    ];

    public selectedChartType = 1000;

    public chartLabels: any = [];  // здесь будут храниться метки времени
    public chartData: ChartDataset<"line", (number | [number, number] | Point | BubbleDataPoint | null)[]>[] = [
        {data: [], label: 'My Label'},  // здесь будут храниться значения параметра
    ];

    constructor(public dialogRef: MatDialogRef<WineMaterialBatchPhaseParameterChartModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    grapeSortPhaseId: string,
                    wineMaterialBatchGrapeSortPhaseId: string,
                    parameterDetail: IWineMaterialBatchGrapeSortPhaseParameterDetailsResult
                },
                private wineMaterialBatchesService: WineMaterialBatchesService) {

        this.chartData[0].label = this.data.parameterDetail.parameter.name;

        const requestBody = {
            WineMaterialBatchGrapeSortPhaseParameterId: this.data.parameterDetail.id,
            ChartType: 1000
        };

        this.wineMaterialBatchesService.getChartDataForPhaseParameter(requestBody).subscribe((result) => {
            this.chartData[0].data = result.values;
            this.chartLabels = result.labels;
            console.log(result);
        });
    }

    onChartTypeChange($event: MatSelectChange) {
        this.selectedChartType = $event.value;

        const requestBody = {
            WineMaterialBatchGrapeSortPhaseParameterId: this.data.parameterDetail.id,
            ChartType: this.selectedChartType
        };

        this.wineMaterialBatchesService.getChartDataForPhaseParameter(requestBody).subscribe((result) => {
            this.chartData[0].data = result.values;
            this.chartLabels = result.labels;
        });
    }
}
