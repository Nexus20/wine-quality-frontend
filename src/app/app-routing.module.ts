import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'phases',
        loadChildren: () => import('./phases/phases.module').then(m => m.PhasesModule)
    },
    {
        path: 'parameters',
        loadChildren: () => import('./parameters/parameters.module').then(m => m.ParametersModule)
    },
    {
        path: 'grape-sorts',
        loadChildren: () => import('./grape-sorts/grape-sorts.module').then(m => m.GrapeSortsModule)
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
