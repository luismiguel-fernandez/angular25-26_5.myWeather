import { Component, inject } from '@angular/core';
import { WeatherData } from '../weather-data';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styles: ``,
})
export class Search {

  private data = inject(WeatherData)

  searchByName(pattern:string) {
    this.data.searchByName(pattern).subscribe(
      data => {
        
      }
    )
  }
}
