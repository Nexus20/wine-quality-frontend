import {Component, OnInit} from '@angular/core';
import {IPhaseResult} from "../models/phase-result";
import {ActivatedRoute} from "@angular/router";
import {PhaseCreateComponent} from "../phase-create/phase-create.component";
import {PhaseEditComponent} from "../phase-edit/phase-edit.component";
import {PhaseDeleteComponent} from "../phase-delete/phase-delete.component";
import {PhaseDetailsComponent} from "../phase-details/phase-details.component";
import {MatDialog} from "@angular/material/dialog";
import {PhasesService} from "../services/phases.service";

@Component({
    selector: 'app-phases',
    templateUrl: './phases.component.html',
    styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {
    displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'actions'];
    phases: IPhaseResult[] = [];

    constructor(private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private phasesService: PhasesService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({phases}) => {
            this.phases = phases;
            console.log(phases);
        })
    }

    openDetailsDialog(phaseId: string): void {
        this.phasesService.getById(phaseId).subscribe(phaseDetail => {
            this.dialog.open(PhaseDetailsComponent, { data: phaseDetail });
        });
    }

    openDeleteDialog(phase: IPhaseResult): void {
        const dialogRef = this.dialog.open(PhaseDeleteComponent, {
            data: phase
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openEditDialog(phase: IPhaseResult): void {
        const dialogRef = this.dialog.open(PhaseEditComponent, { data: phase });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(PhaseCreateComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    refreshData(): void {
        this.phasesService.get().subscribe((phases) => {
            this.phases = phases;
        })
    }
}
