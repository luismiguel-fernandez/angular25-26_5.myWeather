import { Component, inject } from '@angular/core';
import { UserData } from '../user-data';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  logged: boolean = false;
  username: string = "";
  //userId: string = "";

  private userData = inject(UserData)

  getUserId() {
    return this.userData.getUserId();
  }

  logout() {
    this.logged = false;
    this.username = "";
  }

  tryLogin(username: string, password: string) {
    if (username.length > 0 && password.length > 0) {
      this.userData.tryLogin(username, password).subscribe(
        (data: any) => {
          if (data.success) {
            this.logged = true;
            this.username = username;
            //this.userId = data.usuario_id;
            this.userData.setUserId(data.usuario_id);
            //recuperamos YA las ciudades favoritas
            this.userData.getFavoriteCities().subscribe(
              (data:any) => {
                this.userData.setMyCities(data.ciudades_favoritas);
              }
            )
          } else {
            alert(data.message);
          }
        },
        (error: any) => {
          alert("error en el login")
        }
      );
    }
  }
}
