import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserPrefs {
  private myCities: string[] = JSON.parse(localStorage.getItem('myCities') || "[]");
  
  addCityToMyCities(id:string) {
    if (this.myCities.indexOf(id) === -1) {
      this.myCities.push(id);
      localStorage.setItem('myCities', JSON.stringify(this.myCities));
    }
  }

  isAlreadyInMyCities(id:string) {
    return this.myCities.indexOf(id) !== -1;
  }

  removeCityFromMyCities(id:string) {
    const index = this.myCities.indexOf(id);
    if (index !== -1) {
      this.myCities.splice(index, 1);
      localStorage.setItem('myCities', JSON.stringify(this.myCities));
    }
  }
}
