import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {IParameterResult} from "../../phases/models/phase-result";
import {ParametersService} from "../services/parameters.service";

export const parametersResolver: ResolveFn<IParameterResult[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ParametersService).get();
};
