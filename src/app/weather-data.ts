import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherData {

  private http = inject(HttpClient)
  private urlBase = "https://api.openweathermap.org/data/2.5/"
  private urlSufix = "&appid=0617ecda468c5e9492d75f4388b1ddf5&units=metric"
  
  searchByName(pattern:string) {
    return this.http.get(this.urlBase + "find?q=" + pattern + this.urlSufix)
  }

  getById(id:string) {
    return this.http.get(this.urlBase + "weather?id=" + id + this.urlSufix)
  }
}
