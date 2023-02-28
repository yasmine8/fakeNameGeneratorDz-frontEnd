import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AjouterComponent } from './ajouter/ajouter.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashbordComponent } from './admin-dashboard/admin-dashboard.component';
import { GenerateComponent } from './generate/generate.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  //{ path : 'home', component: HomeComponent},
  { path : 'generate', component: GenerateComponent},
  { path : 'ajouter', component: AjouterComponent},
  { path : 'about', component: AboutComponent},
  { path : 'admin', component: AdminDashbordComponent},
  { path : '' , redirectTo: 'generate',pathMatch:'full'},
  { path : '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
