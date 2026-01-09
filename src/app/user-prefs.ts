import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserPrefs {

  private http = inject(HttpClient)
  private myCities: any[] = JSON.parse(localStorage.getItem('myCities') || "[]");
  
  addCityToMyCities(city:any) {
    if (this.myCities.indexOf(city) === -1) {
      this.myCities.push(city);
      localStorage.setItem('myCities', JSON.stringify(this.myCities));
      //insertar también en la BD mysql
      alert("ahora viene la llamada HTTP")
      this.http.post("http://localhost/dwec/weather/addCity.php", {
        usuario_id: 1,
        id_ciudad_api: city.id,
        nombre_ciudad: city.name,
        codigo_pais: city.sys.country
      }).subscribe(
        (data:any) => {
          console.log(data)
        }
      )
    }
  }

  getFavoriteCities() {
    return this.myCities;
  }

  isAlreadyInMyCities(id:string) {
    return this.myCities.find(city => city.id == id);
  }

  removeCityFromMyCities(id:string) {
    // const index = this.myCities.findIndex(c => c.id == id);

    // if (index >= 0) {
    //   this.myCities.splice(index, 1);
    //   localStorage.setItem('myCities', JSON.stringify(this.myCities));
    // }

    //todo lo comentado equivale a estas 2 lineas
    this.myCities = this.myCities.filter(c => c.id != id);
    localStorage.setItem('myCities', JSON.stringify(this.myCities));
  }
}
