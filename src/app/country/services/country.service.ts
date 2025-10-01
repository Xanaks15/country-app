import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  private http = inject(HttpClient);


  searchByCapital( query: string){
    query = query.toLowerCase();

    return this.http.get(`${API_URL}/capital/${ query }`)
  }
}
