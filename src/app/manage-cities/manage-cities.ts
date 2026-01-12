import { Component, inject } from '@angular/core';
import { UserPrefs } from '../user-prefs';
import { FormsModule } from '@angular/forms';
import { FavCityByPatternPipe } from '../fav-city-by-pattern-pipe';
import { CityCard } from '../city-card/city-card';
import { FavCityByColderTempPipe } from '../fav-city-by-colder-temp-pipe';
import { UserData } from '../user-data';

@Component({
  selector: 'app-manage-cities',
  imports: [FormsModule, FavCityByPatternPipe, CityCard, FavCityByColderTempPipe],
  templateUrl: './manage-cities.html',
  styles: ``,
})
export class ManageCities {

  private userData = inject(UserData)
  pattern:string = ""
  degrees:string = ""
  myCities:any[] = []
  citiesLoaded:boolean = false

  constructor() {
    this.getFavoriteCities();
  }

  getFavoriteCities() {
    //OPCION #1: recibimos un Observable (locker de metacrilato de Amazon) --> nos tenemos que suscribir
    this.userData.getFavoriteCities().subscribe(
      (data:any) => {
        this.myCities = data.ciudades_favoritas
        this.citiesLoaded = true
      }
    )
  }
}