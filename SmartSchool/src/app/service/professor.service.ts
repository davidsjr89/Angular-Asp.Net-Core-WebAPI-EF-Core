import { Professor } from '../models/Professor';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  baseUrl = `${environment.UrlPrincipal}/api/professor`;
constructor(private http: HttpClient) { }

getAll(): Observable<Professor[]>{
    return this.http.get<Professor[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Professor>{
    return this.http.get<Professor>(`${this.baseUrl}/${id}`);
  }

  post(professor: Professor){
    return this.http.post(`${this.baseUrl}`, professor);
  }

  put(professor: Professor){
    return this.http.put(`${this.baseUrl}/${professor.id}`, professor);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
