import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";
import {BaseChartDirective} from "ng2-charts";
import {BubbleDataPoint, Chart, ChartOptions, Point, registerables} from "chart.js";
import {ChartDataset} from "chart.js/dist/types";
import {IWineMaterialBatchGrapeSortPhaseParameterDetailsResult} from "../models/wine-material-batch-details-result";
import {MatSelectChange} from "@angular/material/select";
import zoomPlugin from 'chartjs-plugin-zoom';
import { default as Annotation } from 'chartjs-plugin-annotation';

Chart.register(...registerables, zoomPlugin, Annotation);

@Component({
    selector: 'app-wine-material-batch-phase-parameter-chart-modal',
    templateUrl: './wine-material-batch-phase-parameter-chart-modal.component.html',
    styleUrls: ['./wine-material-batch-phase-parameter-chart-modal.component.scss']
})
export class WineMaterialBatchPhaseParameterChartModalComponent {

    public chartTypes = [
        {value: 1000, viewValue: 'Hour'},
        {value: 2000, viewValue: 'Day'},
        {value: 3000, viewValue: 'Week'},
        {value: 4000, viewValue: 'Month'},
        {value: 5000, viewValue: 'Year'},
        {value: 6000, viewValue: 'All Time'},
    ];

    public selectedChartType = 1000;
    public isStandardsShown = false;

    // annotation plugin does not work
    public chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy',
                }
            },
            // // @ts-ignore
            // annotation: {
            //     annotations: [
            //         {
            //             type: 'line',
            //             yMin: 60,
            //             yMax: 60,
            //             borderColor: 'rgb(1,255,4)',
            //             borderWidth: 1,
            //         },
            //         {
            //             type: 'line',
            //             yMin: 120,
            //             yMax: 120,
            //             borderColor: 'rgb(255, 99, 132)',
            //             borderWidth: 1,
            //         }
            //     ]
            // }
        }
    };
    public chartLegend: boolean = true;

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    public chartLabels: any = [];  // здесь будут храниться метки времени
    public chartData: ChartDataset<"line", (number | [number, number] | Point | BubbleDataPoint | null)[]>[] = [
        {data: [], label: 'Parameter'},  // здесь будут храниться значения параметра
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

            // Adds standards bounds annotations to the chart
            // // @ts-ignore
            // this.chartOptions.plugins["annotation"].annotations[0].yMax = this.data.parameterDetail.standard.upperBound;
            // // @ts-ignore
            // this.chartOptions.plugins["annotation"].annotations[0].yMin = this.data.parameterDetail.standard.upperBound;
            // // @ts-ignore
            // this.chartOptions.plugins["annotation"].annotations[1].yMax = this.data.parameterDetail.standard.lowerBound;
            // // @ts-ignore
            // this.chartOptions.plugins["annotation"].annotations[1].yMin = this.data.parameterDetail.standard.lowerBound;
        });
    }

    hideStandardsAnnotations() {

        this.chartOptions = {
            responsive: true,
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'xy',
                    }
                }
            }
        };

        this.isStandardsShown = false;
        this.chart?.update();
    }

    showStandardsAnnotations() {
        // @ts-ignore
        this.chartOptions = {
            responsive: true,
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'xy',
                    }
                },
                // @ts-ignore
                annotation: {
                    annotations: [
                        {
                            type: 'line',
                            yMin: this.data.parameterDetail.standard.upperBound,
                            yMax: this.data.parameterDetail.standard.upperBound,
                            borderColor: 'rgb(1,255,4)',
                            borderWidth: 1,
                        },
                        {
                            type: 'line',
                            yMin: this.data.parameterDetail.standard.lowerBound,
                            yMax: this.data.parameterDetail.standard.lowerBound,
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1,
                        }
                    ]
                }
            }
        };

        this.isStandardsShown = true;
        this.chart?.update();
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
