import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ParametersService} from "../services/parameters.service";
import {IParameterResult} from "../../phases/models/phase-result";
import {ParameterDeleteComponent} from "../parameter-delete/parameter-delete.component";
import {ParameterEditComponent} from "../parameter-edit/parameter-edit.component";
import {ParameterCreateComponent} from "../parameter-create/parameter-create.component";
import {ParameterDetailsComponent} from "../parameter-details/parameter-details.component";

@Component({
    selector: 'app-parameters',
    templateUrl: './parameters.component.html',
    styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
    displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'actions'];
    parameters: IParameterResult[] = [];

    constructor(private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private parametersService: ParametersService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({parameters}) => {
            this.parameters = parameters;
            console.log(parameters);
        })
    }

    openDetailsDialog(parameterId: string): void {
        this.parametersService.getById(parameterId).subscribe(parameterDetail => {
            this.dialog.open(ParameterDetailsComponent, {data: parameterDetail});
        });
    }

    openDeleteDialog(parameter: IParameterResult): void {
        const dialogRef = this.dialog.open(ParameterDeleteComponent, {
            data: parameter
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openEditDialog(parameter: IParameterResult): void {
        const dialogRef = this.dialog.open(ParameterEditComponent, {data: parameter});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    openCreateDialog(): void {
        const dialogRef = this.dialog.open(ParameterCreateComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    refreshData(): void {
        this.parametersService.get().subscribe((parameters) => {
            this.parameters = parameters;
        })
    }
}
