import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  private http = inject(HttpClient)
  private userId: string = "";

  getFavoriteCities() {
    return this.http.get("http://localhost/weather/getCities.php?usuario_id=" + this.userId);
  }

  getUserId() {
    return this.userId;
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
