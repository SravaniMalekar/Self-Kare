import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SelfAnalyseComponent } from './self-analyse/self-analyse.component';
import { TweetsComponent } from './tweets/tweets.component';

const routes: Routes = [
  {path: '', redirectTo: '/main-dashboard', pathMatch: "full"},
  {path: 'main-dashboard', component: MainDashboardComponent},
  {path: 'self-analyse', component: SelfAnalyseComponent},
  {path: 'tweets', component:TweetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
