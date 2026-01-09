import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  private http = inject(HttpClient)

  login(username:string, password:string) {
    return this.http.post("http://localhost/weather/login.php", {
      usuario: username,
      password: password
    });
  }
}
