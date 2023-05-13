import {Component, OnInit} from '@angular/core';
import {IPhaseResult} from "../models/phase-result";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {
    displayedColumns: string[] = ['name', 'createdAt', 'updatedAt'];
    phases: IPhaseResult[] = [];

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({phases}) => {
            this.phases = phases;
            console.log(phases);
        })
    }
}
