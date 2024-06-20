import { Routes } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/gaurds/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { ListOrdersComponent } from './pages/list-orders/list-orders.component';
import { PaymentCompleteComponent } from './pages/payment-complete/payment-complete.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate : [authGuard],
        children: [{
            path: 'home',
            component: DashboardComponent,
            canActivate: [authGuard]
        },
        {
            path: 'cart',
            component: CartComponent,
            canActivate: [authGuard]   
        },
        {
            path: 'orders',
            component: ListOrdersComponent,
            canActivate: [authGuard]     
        },
        {
            path: 'payment-complete',
            component: PaymentCompleteComponent,
            canActivate: [authGuard]
        },
        {
            path: 'all-users',
            component: AllUsersComponent,
            canActivate: [authGuard]
        },
        {
            path: 'logout',
            component: LogoutComponent,
            canActivate: [authGuard]
        }]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
