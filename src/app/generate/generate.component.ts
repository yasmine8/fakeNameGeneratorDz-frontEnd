import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { XLSX$Consts } from 'xlsx';
import { Nom } from '../nom';
import { NomService } from '../nom.service';
import { NomPrenom } from '../NomPrenom';
import { Prenom } from '../prenom';
import { Signaler } from '../signaler';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  namesForm= new FormGroup({
    nombre_: new FormControl(3),
    genre_:new FormControl(1),
    affichage_:new FormControl(1)
  })

  public noms: Nom[];
  public prenoms: Prenom[];
  //public signaler: Signaler[];
  public signal: Signaler;
  public nomPrenom: NomPrenom[];
  public signalNomPrenom : NomPrenom | undefined ;

  page : number =1;
  count : number = 0;
  tableSize : number =10;

  showTable: boolean = false;

  fileName = "FakeNameGeneratorDz.xlsx";

  constructor(
    private nomService: NomService,
    private router : Router
    )  { }
  
  ngOnInit() {
    
  }
  public  toggleShowTable(): void {
      this.showTable = !this.showTable;
  }


  public onRandomData(): void {
    this.showTable = true;
    var nf = this.namesForm.value;
    var numberValue = Number(nf.nombre_);
    this.nomPrenom = [];
    this.nomService.getRandomNoms(numberValue).subscribe(
      (response: Nom[]) => {
        this.noms = response;
        if (nf.genre_==1) {
          this.nomService.getRandomPrenoms(numberValue).subscribe(
            (response: Prenom[]) => {
              this.prenoms = response;
              this.npFuncton(numberValue);
            },
            (error : HttpErrorResponse) =>{
              alert(error.message);
            }
            );
        }else if(nf.genre_==2){
          this.nomService.getRandomPrenomsM(numberValue).subscribe(
            (response: Prenom[]) => {
              this.prenoms = response;
              this.npFuncton(numberValue);
            },
            (error : HttpErrorResponse) =>{
              alert(error.message);
            }
            );
        }else {
          this.nomService.getRandomPrenomsF(numberValue).subscribe(
            (response: Prenom[]) => {
              this.prenoms = response;
              this.npFuncton(numberValue);
            },
            (error : HttpErrorResponse) =>{
              alert(error.message);
            }
            );
        }
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
      );

  }
    npFuncton(numberValue : number){
        for (let i = 0; i <numberValue; i++) {
          this.nomPrenom.push({
                id : i,
                idNom : this.noms[i].id,
                idPrenom : this.prenoms[i].id,
                nomAr: this.noms[i].nomAr,
                nomFr : this.noms[i].nomFr,
                prenomAr :this.prenoms[i].prenomAr,
                prenomFr:this.prenoms[i].prenomFr
          });   
        }
    }

    
  public sendSignal(form : NgForm, nomPrenom: NomPrenom) {
     this.signal = { id: 1, 
          date:  new Date(),
          idNom: nomPrenom.idNom,
          idPrenom: nomPrenom.idPrenom,
          nomFr: form.value.NomFr,
          nomAr: form.value.NomAr,
          prenomFr: form.value.PrenomFr,
          prenomAr: form.value.PrenomAr,
          raison : form.value.raison,
          commentaire : form.value.commentaire,
          situation : false
        }
      this.nomService.addSignaler(this.signal).subscribe(
      (response: Signaler) => {
        form.reset();
        console.log(response);
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
        form.reset();
      }
      );
  }  
  public send(nomPrenom: NomPrenom) {
    this.signalNomPrenom = nomPrenom;
  }  

  public onExportExcel(): void{
    let element = document.getElementById('excel-table');

    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,this.fileName);
  }
  onTableDataChange(event :any){
    this.page = event;
    //this.getTraces();
  }
}
