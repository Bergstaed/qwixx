import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";


const routes: Routes = [
    { path: '', redirectTo: '/classic', pathMatch: 'full' },
    { path: 'classic/:id',  component: AppComponent },
    { path: 'color/:id', component: AppComponent },
    { path: 'number/:id',     component: AppComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}