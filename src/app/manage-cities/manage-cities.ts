import { Component, inject } from '@angular/core';
import { UserPrefs } from '../user-prefs';
import { FormsModule } from '@angular/forms';
import { FavCityByPatternPipe } from '../fav-city-by-pattern-pipe';

@Component({
  selector: 'app-manage-cities',
  imports: [FormsModule, FavCityByPatternPipe],
  templateUrl: './manage-cities.html',
  styles: ``,
})
export class ManageCities {

  private userPrefs = inject(UserPrefs)
  pattern:string = ""

  getFavoriteCities() {
    return this.userPrefs.getFavoriteCities()
  }
}
