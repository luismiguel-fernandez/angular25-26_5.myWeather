import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  private http = inject(HttpClient)
  private userId: string = "";
  private myCities: string[] = [];

  getFavoriteCities() {
    return this.http.get("http://localhost/weather/getCities.php?usuario_id=" + this.userId);
  }

  getMyCities() {
    return this.myCities;
  }

  getUserId() {
    return this.userId;
  }

  setMyCities(cities:string[]) {
    this.myCities = cities;
  }

  setUserId(id:string) {
    this.userId = id;
  }

  tryLogin(username:string, password:string) {
    return this.http.post("http://localhost/weather/login.php", {
      usuario:  username,
      password: password
    });
  }
}
