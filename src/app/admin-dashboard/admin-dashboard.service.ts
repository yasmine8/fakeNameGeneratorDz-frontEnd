import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nom } from '../nom';
import { Prenom } from '../prenom';
import { Signaler } from '../signaler';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private SERVER_URL =environment.serverUrl;
  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  public getHttpTraces(): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/httptrace`);
  }
  public getSignalers(): Observable<Signaler[]>{
    return this.http.get<Signaler[]>(`${this.apiServerUrl}/signaler/all`);
  }
  public nomById(id: number): Observable<Nom> {
    return this.http.get<Nom>(`${this.apiServerUrl}/nom/find/${id}`);
  }
  public prenomById(id: number): Observable<Prenom> {
    return this.http.get<Prenom>(`${this.apiServerUrl}/prenom/find/${id}`);
  }
  public deleteNom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/nom/delete/${id}`);
  }
  public deletePrenom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/prenom/delete/${id}`);
  }
  public editNom(nom: Nom): Observable<Nom> {
    return this.http.put<Nom>(`${this.apiServerUrl}/nom/update`,nom);
  }
  public editPrenom(prenom: Prenom): Observable<Prenom> {
    return this.http.put<Prenom>(`${this.apiServerUrl}/prenom/update`,prenom);
  }
  public updateSignaler(signaler : Signaler): Observable<Signaler>{
    return this.http.put<Signaler>(`${this.apiServerUrl}/signaler/update`,signaler);
  }
}
