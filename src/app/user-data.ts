import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  private http = inject(HttpClient)
  
  private logged: boolean = false;
  private userId: string = "";
  private username: string = "";
  private myCities: string[] = [];
  private homeCity: string = "";

  getFavoriteCities() {
    return this.http.get("http://localhost/weather/getCities.php?usuario_id=" + this.userId);
  }

  getHomeCity() { return this.homeCity; }
  getLogged() { return this.logged; }
  getMyCities() { return this.myCities; }
  getUserId() { return this.userId; }
  getUsername() { return this.username; }

  setHomeCity(city:string) { this.homeCity = city; }
  setLogged(logged:boolean) { this.logged = logged; }
  setMyCities(cities:string[]) { this.myCities = cities; }
  setUserId(id:string) { this.userId = id; }
  setUsername(name:string) { this.username = name; }

  addCityToMyCities(city:string) {
    this.myCities.push(city);
    //también quiero actualizar en la BBDD
    this.http.post("http://localhost/weather/addCity.php", {
      usuario_id: this.userId,
      id_ciudad_api: city
    }).subscribe();
  }


  tryLogin(username:string, password:string) {
    return this.http.post("http://localhost/weather/login.php", {
      usuario:  username,
      password: password
    });
  }
}
