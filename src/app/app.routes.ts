import { Routes } from '@angular/router';
import { MyCity } from './my-city/my-city';
import { Search } from './search/search';
import { ManageCities } from './manage-cities/manage-cities';
import { Page404 } from './page404/page404';

export const routes: Routes = [
    { path: "myCity", component: MyCity },
    { path: "search", component: Search },
    { path: "manage", component: ManageCities },
    { path: "", redirectTo: "myCity", pathMatch: "full" },
    { path: "**", component: Page404 }
];
