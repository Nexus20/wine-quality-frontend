import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {IGrapeSortResult} from "../models/grape-sort-result";

export const grapeSortsResolver: ResolveFn<IGrapeSortResult[]> = () => {
    return inject(GrapeSortsService).get();
};
