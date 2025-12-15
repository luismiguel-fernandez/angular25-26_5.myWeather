import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-city-card',
  imports: [],
  templateUrl: './city-card.html',
  styles: ``,
})
export class CityCard {
  @Input() city:any

}
