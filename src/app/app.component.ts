import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Input  } from '@angular/core';
import { Nom } from './nom';
import { NomPrenom } from './NomPrenom';
import { NomService } from './nom.service';
import { Prenom } from './prenom';
import {  NgForm,FormsModule  } from '@angular/forms';
import { theForm } from './theForm';
import { Router } from '@angular/router';
//import { Prenom } from './prenom';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cssNameGenerator';

  constructor(
    private router : Router
    )  { }

}




