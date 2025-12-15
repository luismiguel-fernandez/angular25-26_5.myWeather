import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favCityByColderTemp'
})
export class FavCityByColderTempPipe implements PipeTransform {

  transform(favCities: any[], degrees: string): any[] {
    if (degrees === "") {
      return favCities;
    }
    let numDegrees = parseFloat(degrees)
    return favCities.filter(c => c.main.temp < numDegrees);
  }

}
