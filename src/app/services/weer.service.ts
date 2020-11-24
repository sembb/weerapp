import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeerService {
  url = "https://api.openweathermap.org/data/2.5/weather";
  apiKey = "a365f4ec5b45ec1c97b412c602181b07";
  city = "lemmer";

  constructor(private http: HttpClient) { }

  searchData(searchTerm: string){
    this.city = searchTerm;
    return this.http.get(`${this.url}?appid=${this.apiKey}&q=${this.city}&units=metric&lang=nl`);
  }

}
