import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SelfAnalyseComponent } from './self-analyse/self-analyse.component';
import { TweetsComponent } from './tweets/tweets.component';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: "full"},
  {path:'auth', component: AuthComponent},
  {path: 'main-dashboard', component: MainDashboardComponent, canActivate: [AuthGuard]},
  {path: 'self-analyse', component: SelfAnalyseComponent, canActivate: [AuthGuard]},
  {path: 'bed-locator', component:TweetsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
