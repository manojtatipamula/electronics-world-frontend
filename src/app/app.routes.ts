import { Routes } from '@angular/router';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AppComponent } from './app.component';
import { PaymentCompleteComponent } from './pages/payment-complete/payment-complete.component';
import { PaymentCancelComponent } from './pages/payment-cancel/payment-cancel.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    {
        path: 'home',
        component: AddressFormComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'payment-complete',
        component: PaymentCompleteComponent
    }, {
        path: 'payment-cancel',
        component: PaymentCancelComponent
    }, {
        path: 'logout',
        component: LogoutComponent
    }
];
