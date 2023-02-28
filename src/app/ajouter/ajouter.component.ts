import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Nom } from '../nom';
import { NomService } from '../nom.service';
import { Prenom } from '../prenom';
@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {

  public options: Array<{id: number, name: string}> = [
    { id: 1, name: "Mâle" },
    { id: 2, name: "Femelle" }
  ];
  client_notification: any = false;
  candidate_notification: any = false;
  cancel_associated_session: any = false;
  constructor(
    private nomService: NomService,
    )  { }
  ngOnInit(): void {
  }

  public onAddNom(form:NgForm):void{
    this.nomService.addNom(form.value).subscribe(
      (response: Nom) => {
        form.reset();
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
        form.reset();
      }
      );
  }
  onAddPrenom(form:NgForm){
  this.nomService.addPrenom(form.value).subscribe(
      (response: Prenom) => {
        form.reset();
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
        form.reset();
      }
      );
  }
}
