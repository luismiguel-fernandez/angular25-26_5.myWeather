import { Component } from '@angular/core';
import { Login } from "../login/login";

@Component({
  selector: 'app-header',
  imports: [Login],
  templateUrl: './header.html',
  styles: `
    div {
      background-color: rgb(240, 240, 240);
    }
  `,
})
export class Header {

}
