import { Routes } from '@angular/router';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [{
    path: '' , component: AppComponent , pathMatch: 'full'
},{
    path : 'home' , component : AddressFormComponent
}];
