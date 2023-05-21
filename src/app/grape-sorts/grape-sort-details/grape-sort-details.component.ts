import {Component, OnInit} from '@angular/core';
import {IGrapeSortDetailsResult, IGrapeSortPhaseResult, IWineMaterialBatchResult} from "../models/grape-sort-result";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {
    GrapeSortPhaseStandardsSettingsComponent
} from "../grape-sort-phase-standards-settings/grape-sort-phase-standards-settings.component";
import {
    WineMaterialBatchCreateModalComponent
} from "../wine-material-batch-create-modal/wine-material-batch-create-modal.component";
import {
    WineMaterialBatchDeleteModalComponent
} from "../wine-material-batch-delete-modal/wine-material-batch-delete-modal.component";
import {
    WineMaterialBatchEditModalComponent
} from "../wine-material-batch-edit-modal/wine-material-batch-edit-modal.component";

@Component({
    selector: 'app-grape-sort-details',
    templateUrl: './grape-sort-details.component.html',
    styleUrls: ['./grape-sort-details.component.scss']
})
export class GrapeSortDetailsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'harvestLocation', 'harvestDate', 'actions'];
    grapeSortDetails!: IGrapeSortDetailsResult;

    constructor(private dialog: MatDialog,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({grapeSort}) => {
            this.grapeSortDetails = grapeSort;
            this.grapeSortDetails.phases = this.grapeSortDetails.phases.sort((a, b) => a.order - b.order);
            console.log(grapeSort);
        })
    }

    openStandardSettingsDialog(phase: IGrapeSortPhaseResult): void {
        const dialogRef = this.dialog.open(GrapeSortPhaseStandardsSettingsComponent, {
            width: '500px',
            data: {
                standards: phase.grapeSortProcessPhaseParameterStandards, // Список стандартов для текущей фазы
                phaseParameters: phase.parameters,
                grapeSortPhaseId: phase.id// Список всех параметров для текущей фазы
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // Обработка результатов после закрытия модального окна, если необходимо
            }
        });
    }

    openCreateWineMaterialBatchDialog() {
        const dialogRef = this.dialog.open(WineMaterialBatchCreateModalComponent, {
            data: {
                grapeSortId: this.grapeSortDetails.id
            },
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((newWineMaterialBatch) => {

            if (newWineMaterialBatch)
                this.grapeSortDetails.wineMaterialBatches = [...this.grapeSortDetails.wineMaterialBatches, newWineMaterialBatch];
        });
    }

    openWineMaterialBatchEditDialog(wineMaterialBatch: IWineMaterialBatchResult) {
        const dialogRef = this.dialog.open(WineMaterialBatchEditModalComponent, {
            data: wineMaterialBatch
        });

        dialogRef.afterClosed().subscribe(updatedWineMaterialBatch => {

            if (updatedWineMaterialBatch) {
                const index = this.grapeSortDetails.wineMaterialBatches.findIndex(x => x.id == updatedWineMaterialBatch.id);

                if(index > -1) {
                    this.grapeSortDetails.wineMaterialBatches[index].harvestLocation = updatedWineMaterialBatch.harvestLocation;
                    this.grapeSortDetails.wineMaterialBatches[index].harvestDate = updatedWineMaterialBatch.harvestDate;
                    this.grapeSortDetails.wineMaterialBatches[index].name = updatedWineMaterialBatch.name;
                }
            }
        });
    }

    openWineMaterialBatchDeleteDialog(wineMaterialBatch: IWineMaterialBatchResult) {
        const dialogRef = this.dialog.open(WineMaterialBatchDeleteModalComponent, {
            data: wineMaterialBatch
        });

        dialogRef.afterClosed().subscribe(deletedWineMaterialBatchId => {
            if (deletedWineMaterialBatchId) {
                this.grapeSortDetails.wineMaterialBatches = this.grapeSortDetails.wineMaterialBatches.filter(x => x.id != deletedWineMaterialBatchId);
            }
        });
    }

    openQualityPredictionSettings(phase: IGrapeSortPhaseResult) {

    }
}
