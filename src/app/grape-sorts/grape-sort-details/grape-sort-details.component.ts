import {Component, OnInit} from '@angular/core';
import {IGrapeSortDetailsResult, IGrapeSortPhaseResult} from "../models/grape-sort-result";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {
    GrapeSortPhaseStandardsSettingsComponent
} from "../grape-sort-phase-standards-settings/grape-sort-phase-standards-settings.component";
import {
    WineMaterialBatchCreateModalComponent
} from "../wine-material-batch-create-modal/wine-material-batch-create-modal.component";

@Component({
    selector: 'app-grape-sort-details',
    templateUrl: './grape-sort-details.component.html',
    styleUrls: ['./grape-sort-details.component.scss']
})
export class GrapeSortDetailsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'harvestLocation', 'harvestDate', 'actions'];
    grapeSortDetails!: IGrapeSortDetailsResult;

    constructor(private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private grapeSortsService: GrapeSortsService) {
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
}
