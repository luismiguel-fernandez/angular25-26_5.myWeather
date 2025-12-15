import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favCityByPattern'
})
export class FavCityByPatternPipe implements PipeTransform {

  transform(favCities: any[], pattern: string): any[] {
    return favCities.filter(c => c.name.toLowerCase().includes(pattern.toLowerCase()));
  }

}
