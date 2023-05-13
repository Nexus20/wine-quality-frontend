import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {IPhaseResult} from "../models/phase-result";
import {inject} from "@angular/core";
import {PhasesService} from "../services/phases.service";

export const phasesResolver: ResolveFn<IPhaseResult[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PhasesService).get();
};
