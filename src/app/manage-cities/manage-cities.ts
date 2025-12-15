import { Component, inject } from '@angular/core';
import { UserPrefs } from '../user-prefs';
import { FormsModule } from '@angular/forms';
import { FavCityByPatternPipe } from '../fav-city-by-pattern-pipe';
import { CityCard } from '../city-card/city-card';
import { FavCityByColderTempPipe } from '../fav-city-by-colder-temp-pipe';

@Component({
  selector: 'app-manage-cities',
  imports: [FormsModule, FavCityByPatternPipe, CityCard, FavCityByColderTempPipe],
  templateUrl: './manage-cities.html',
  styles: ``,
})
export class ManageCities {

  private userPrefs = inject(UserPrefs)
  pattern:string = ""
  degrees:string = ""

  getFavoriteCities() {
    return this.userPrefs.getFavoriteCities()
  }
}
