import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {GrapeSortsComponent} from './grape-sorts/grape-sorts.component';
import {grapeSortsResolver} from "./resolvers/grape-sorts.resolver";
import {MatButtonModule} from "@angular/material/button";
import { GrapeSortCreateComponent } from './grape-sort-create/grape-sort-create.component';
import { GrapeSortDeleteComponent } from './grape-sort-delete/grape-sort-delete.component';
import { GrapeSortEditComponent } from './grape-sort-edit/grape-sort-edit.component';
import { GrapeSortDetailsComponent } from './grape-sort-details/grape-sort-details.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        GrapeSortsComponent,
        GrapeSortCreateComponent,
        GrapeSortDeleteComponent,
        GrapeSortEditComponent,
        GrapeSortDetailsComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: GrapeSortsComponent,
                resolve: {
                    grapeSorts: grapeSortsResolver
                }
            },
        ]),
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
    ]
})
export class GrapeSortsModule {
}
