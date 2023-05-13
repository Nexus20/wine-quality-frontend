import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {IGrapeSortResult} from "../models/grape-sort-result";


@Component({
    selector: 'app-grape-sort-delete',
    templateUrl: './grape-sort-delete.component.html',
    styleUrls: ['./grape-sort-delete.component.scss']
})
export class GrapeSortDeleteComponent {
    constructor(private dialogRef: MatDialogRef<GrapeSortDeleteComponent>,
                private grapeSortsService: GrapeSortsService,
                @Inject(MAT_DIALOG_DATA) public data: IGrapeSortResult) {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.grapeSortsService.delete(this.data.id).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
}
