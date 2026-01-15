import { Component, inject, Input } from '@angular/core';
import { WeatherData } from '../weather-data';

@Component({
  selector: 'app-city-card',
  imports: [],
  templateUrl: './city-card.html',
  styles: ``,
})
export class CityCard {
  @Input() cityId:string = ""

  private weatherData = inject(WeatherData)

  cityData:any = null

  ngOnInit() {
    this.weatherData.getById(this.cityId).subscribe(
      (data:any) => {
        this.cityData = data
      }
    )
  }

}
