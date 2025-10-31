import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { MyItemsComponent } from './components/my-items/my-items.component';
import { MyClaimsComponent } from './components/my-claims/my-claims.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './services/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/login/login.component';

export const routes: Routes = [
  // Public routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin/login', component: AdminLoginComponent }, // <-- ✅ ADD THIS MISSING ROUTE

  // Protected routes
  { path: 'items', component: ItemListComponent, canActivate: [authGuard] },
  { path: 'post-item', component: PostItemComponent, canActivate: [authGuard] },
  { path: 'my-items', component: MyItemsComponent, canActivate: [authGuard] },
  { path: 'my-claims', component: MyClaimsComponent, canActivate: [authGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard]
  },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },

  // Default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];