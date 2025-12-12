import { Component, inject } from '@angular/core';
import { WeatherData } from '../weather-data';
import { UserPrefs } from '../user-prefs';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styles: ``,
})
export class Search {

  private data = inject(WeatherData)
  private userPrefs = inject(UserPrefs)
  private results:any[] = []

  addCityToMyCities(id:string) {
    this.userPrefs.addCityToMyCities(id)
  }

  isAlreadyInMyCities(id:string) {
    return this.userPrefs.isAlreadyInMyCities(id)
  }

  getResults() {
    return this.results
  }

  removeCityFromMyCities(id:string) {
    this.userPrefs.removeCityFromMyCities(id)
  }

  searchByName(pattern:string) {
    this.data.searchByName(pattern).subscribe(
      (data:any) => {
        this.results = data.list
      }
    )
  }
}
