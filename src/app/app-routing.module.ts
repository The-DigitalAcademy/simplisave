/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './pages/learn/learn.component';
import { AccountsComponent } from './pages/accounts/accounts.component'

const routes: Routes = [
    {path: 'accounts', component: AccountsComponent},
    {path : 'learn', component : LearnComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
