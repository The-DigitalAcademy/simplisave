import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { Step1Component } from './pages/auth/register/step1/step1.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'step1', component: Step1Component },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
