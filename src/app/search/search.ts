import { Component, inject } from '@angular/core';
import { WeatherData } from '../weather-data';
import { UserPrefs } from '../user-prefs';
import { UserData } from '../user-data';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styles: ``,
})
export class Search {

  private data = inject(WeatherData)
  //private userPrefs = inject(UserPrefs)
  private userData = inject(UserData)
  private results:any[] = []

  addCityToMyCities(city:any) {
    this.userData.addCityToMyCities(city)
  }

  // isAlreadyInMyCities(id:string) {
  //   return this.userPrefs.isAlreadyInMyCities(id)
  // }

  getLogged() {
    return this.userData.getLogged()
  }
  getResults() {
    return this.results
  }

  // removeCityFromMyCities(id:string) {
  //   this.userPrefs.removeCityFromMyCities(id)
  // }

  searchByName(pattern:string) {
    this.data.searchByName(pattern).subscribe(
      (data:any) => {
        this.results = data.list
      }
    )
  }
}
