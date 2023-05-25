import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPhaseResult} from "../../phases/models/phase-result";
import {IGrapeSortPhaseResult} from "../models/grape-sort-result";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-grape-sort-phases',
  templateUrl: './grape-sort-phases.component.html',
  styleUrls: ['./grape-sort-phases.component.scss']
})
export class GrapeSortPhasesComponent implements OnInit {

    allPhases: IPhaseResult[] = [];
    availablePhases: IPhaseResult[] = [];
    grapeSortPhases: IPhaseResult[] = [];
    private grapeSortId!: string;
    isSaving = false;

    constructor(private activatedRoute: ActivatedRoute,
                private grapeSortsService: GrapeSortsService,
                private snackBar: MatSnackBar,
                private translateService: TranslateService) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.grapeSortId = params['id'];
        });

        this.activatedRoute.data.subscribe(({grapeSortPhases}) => {
            this.grapeSortPhases = (grapeSortPhases as IGrapeSortPhaseResult[]).map(x => ({
                name: x.phaseName,
                id: x.phaseId,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt
            }));
            console.log(grapeSortPhases);

            this.activatedRoute.data.subscribe(({phases}) => {
                this.allPhases = phases;
                this.availablePhases = this.allPhases.filter(
                    (phase) => !this.grapeSortPhases.some((grapeSortPhase) => grapeSortPhase.id === phase.id)
                );
                console.log(phases);
            })
        })
    }

    drop($event: CdkDragDrop<IPhaseResult[], any>) {
        console.log($event);
        console.log($event.previousContainer);
        console.log($event.container);
        if ($event.previousContainer === $event.container) {
            moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
        } else {
            transferArrayItem($event.previousContainer.data,
                $event.container.data,
                $event.previousIndex,
                $event.currentIndex);
        }
    }

    removePhase(grapeSortPhase: IPhaseResult) {
        const index = this.grapeSortPhases.findIndex((gsp) => gsp.id === grapeSortPhase.id);
        if (index > -1) {
            this.grapeSortPhases.splice(index, 1);
            this.availablePhases.push(grapeSortPhase);
        }
    }

    saveGrapeSort() {
        this.isSaving = true;
        const request = {
            grapeSortId: this.grapeSortId,
            phases: this.grapeSortPhases.map((e, i) => {
                return {
                    phaseId: e.id,
                    order: i + 1
                };
            })
        };

        this.grapeSortsService.savePhasesOrder(request).subscribe(() => {
            this.isSaving = false;
            this.translateService.get('grape-sorts.edit-phases.saved').subscribe((message) => {
                this.showSnackbar(message, 3000);
            });
        });
    }

    showSnackbar(message: string, duration: number) {
        this.snackBar.open(message, '', {
            duration: duration,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
        });
    }
}
