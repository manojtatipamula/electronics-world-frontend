import { Routes } from '@angular/router';
import { PaymentCompleteComponent } from './pages/payment-complete/payment-complete.component';
import { PaymentCancelComponent } from './pages/payment-cancel/payment-cancel.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/gaurds/auth.guard';

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
        children: [{
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [authGuard]
        },
        {
            path: 'checkout',
            component: CheckoutComponent,
            canActivate: [authGuard]
        },
        {
            path: 'all-users',
            component: AllUsersComponent,
            canActivate: [authGuard]
        },
        ]
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
