import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nom } from './nom';
import { Prenom } from './prenom'
import { environment } from 'src/environments/environment';
import { Signaler } from './signaler';
@Injectable({
  providedIn: 'root'
})
export class NomService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNoms(): Observable<Nom[]>{
    return this.http.get<Nom[]>(`${this.apiServerUrl}/nom/all`);
  }
  public getRandomNoms(nbr : number): Observable<Nom[]>{
    return this.http.get<Nom[]>(`${this.apiServerUrl}/nom/random?nbr=${nbr}`);
  }
  public addNom(nom : Nom): Observable<Nom>{
    return this.http.post<Nom>(`${this.apiServerUrl}/nom/add`,nom);
  }

  public getPrenoms(): Observable<Prenom[]>{
    return this.http.get<Prenom[]>(`${this.apiServerUrl}/prenom/all`);
  }
  public getRandomPrenoms(nbr : number): Observable<Prenom[]>{
    return this.http.get<Prenom[]>(`${this.apiServerUrl}/prenom/random?nbr=${nbr}`);
  }
  public getRandomPrenomsM(nbr : number): Observable<Prenom[]>{
    return this.http.get<Prenom[]>(`${this.apiServerUrl}/prenom/random/M?nbr=${nbr}`);
  }
  public getRandomPrenomsF(nbr : number): Observable<Prenom[]>{
    return this.http.get<Prenom[]>(`${this.apiServerUrl}/prenom/random/F?nbr=${nbr}`);
  }
  public addPrenom(nom : Prenom): Observable<Prenom>{
    return this.http.post<Prenom>(`${this.apiServerUrl}/prenom/add`,nom);
  }
  
  public addSignaler(signaler : Signaler): Observable<Signaler>{
    return this.http.post<Signaler>(`${this.apiServerUrl}/signaler/add`,signaler);
  }
  
 

}
