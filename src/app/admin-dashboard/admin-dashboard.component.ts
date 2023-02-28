import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Nom } from '../nom';
import { Prenom } from '../prenom';
import { Signaler } from '../signaler';
import { AdminDashboardService } from './admin-dashboard.service';
import { OrderModule } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashbordComponent implements OnInit {
  public traceList : any[] = [];
  public newArray : any[] = [];
  key : string ='id';
  reverse = true;
  pageS : number =1;
  countS : number = 0;
  tableSizeS : number =10;
  
  pageT : number =1;
  countT : number = 0;
  tableSizeT : number =10;
  public http200Traces : any[] = [];
  public http400Traces : any[] = [];
  public http404Traces : any[] = [];
  public http500Traces : any[] = [];
  public httpDefaultTraces : any[] = [];

  public signalerList : Signaler[];
  public signaler : Signaler | undefined;
  public nom : Nom| undefined;
  public prenom : Prenom| undefined;
  constructor(private dashboard : AdminDashboardService){}

  ngOnInit(): void {
    this.getTraces();
    this.getSignalers();
    

  }

  public getTraces(): void {
    this.dashboard.getHttpTraces().subscribe(
      (response : any) => {
        
        this.processTracces(response.traces);
      }, (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getSignalers(): void {
    this.dashboard.getSignalers().subscribe(
      (response : Signaler[]) => {
        this.signalerList = response;
      }, (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public processTracces(traces : any):void {
    this.traceList = traces;
    this.http200Traces = [];
    this.http400Traces = [];
    this.http404Traces  = [];
    this.http500Traces  = [];
    this.traceList.forEach(trace =>{
      switch(trace.response.status){
        case 200:
          this.http200Traces.push(trace);
          break;
        case 400:
          this.http400Traces.push(trace);
          break;
        case 404:
          this.http404Traces.push(trace);
          break;
        case 500:
          this.http500Traces.push(trace);
          break;  
        default:
          this.httpDefaultTraces.push(trace);
      }
    })
  }

  public send(signal : Signaler){
    this.signaler=signal;
    this.dashboard.nomById(signal.idNom).subscribe(
      (response : Nom) => {
        this.nom = response;
        console.log(this.nom);
      }, (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.dashboard.prenomById(signal.idPrenom).subscribe(
      (response : Prenom) => {
        this.prenom = response;
        console.log(this.prenom);
      }, (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNom(nom : Nom,signaler : Signaler):void{
    this.dashboard.deleteNom(nom.id).subscribe(
      (response: void) => {
        signaler.idNom=0;
        this.send(signaler);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeletePrenom(prenom : Prenom,signaler : Signaler):void{
    this.dashboard.deletePrenom(prenom.id).subscribe(
      (response: void) => {
        signaler.idPrenom=0;
        this.send(signaler);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onEditNom(nom : Nom,signal: Signaler): void {
    this.dashboard.editNom(nom).subscribe(
      (response: Nom) => {
        this.send(signal);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };
  public onEditPrenom(prenom : Prenom,signal: Signaler): void {
    this.dashboard.editPrenom(prenom).subscribe(
      (response: Prenom) => {
        this.send(signal);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };

  public onSaveSituation(signaler : Signaler):void{
    signaler.situation=true;
    
    this.dashboard.updateSignaler(signaler).subscribe(
      (response: Signaler) => {
        this.getSignalers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }



  // onSort(a, b) {
  //   if (new Date(a) > new Date(b)) return 1;
  //   if (new Date(a) < new Date(b)) return -1;
  //   return 0;
  // }
  sortData() {
    if(this.reverse) {
      this.newArray = this.signalerList.sort((a:any,b:any)=> b.id - a.id)
      this.reverse = !this.reverse;
    }
    else if(!this.reverse){
      this.newArray = this.signalerList.sort((a:any,b:any)=> a.id - b.id)
      this.reverse = !this.reverse
    }
  }

  onTableDataChangeSignaler(event :any){
    this.pageS = event;
    this.getSignalers();
  }
  
  onTableDataChangeTraces(event :any){
    this.pageT = event;
    this.getTraces();
  }

  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
