import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {IGrapeSortResult} from "../models/grape-sort-result";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {GrapeSortDetailsComponent} from "../grape-sort-details/grape-sort-details.component";
import {GrapeSortDeleteComponent} from "../grape-sort-delete/grape-sort-delete.component";
import {GrapeSortEditComponent} from "../grape-sort-edit/grape-sort-edit.component";
import {GrapeSortCreateComponent} from "../grape-sort-create/grape-sort-create.component";

@Component({
    selector: 'app-grape-sorts',
    templateUrl: './grape-sorts.component.html',
    styleUrls: ['./grape-sorts.component.scss']
})
export class GrapeSortsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'actions'];
    grapeSorts: IGrapeSortResult[] = [];

    constructor(private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private grapeSortsService: GrapeSortsService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({grapeSorts}) => {
            this.grapeSorts = grapeSorts;
            console.log(grapeSorts);
        })
    }

    openDetailsDialog(grapeSortId: string): void {
        this.grapeSortsService.getById(grapeSortId).subscribe(grapeSortDetail => {
            this.dialog.open(GrapeSortDetailsComponent, {data: grapeSortDetail});
        });
    }

    openDeleteDialog(grapeSort: IGrapeSortResult): void {
        const dialogRef = this.dialog.open(GrapeSortDeleteComponent, {
            data: grapeSort
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openEditDialog(grapeSort: IGrapeSortResult): void {
        const dialogRef = this.dialog.open(GrapeSortEditComponent, {data: grapeSort});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(GrapeSortCreateComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    refreshData(): void {
        this.grapeSortsService.get().subscribe((grapeSorts) => {
            this.grapeSorts = grapeSorts;
        })
    }
}
