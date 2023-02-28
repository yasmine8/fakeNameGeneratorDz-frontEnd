import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AjouterComponent } from './ajouter/ajouter.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashbordComponent } from './admin-dashboard/admin-dashboard.component';
import { GenerateComponent } from './generate/generate.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './about/about.component';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    AjouterComponent,
    PageNotFoundComponent,
    AdminDashbordComponent,
    GenerateComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
