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

  private userData = inject(UserData)

  tryLogin(username: string, password: string) {
    if (username.length > 0 && password.length > 0) {
      this.userData.tryLogin(username, password).subscribe(
        (data: any) => {
          if (data.success) {
            this.logged = true;
            this.username = username;
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
