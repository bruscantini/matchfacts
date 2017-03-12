import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PlayerComponent } from './player/player.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { NbaAPIService } from './shared/nba-api.service';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'compare', component: ComparisonComponent }
  /*
  { path: 'hero/:id', component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
  */
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerStatsComponent,
    ComparisonComponent,
    HeaderComponent,
    LandingComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2AutoCompleteModule
  ],
  providers: [
    { provide: 'BASE_ENDPOINT', useValue: environment.baseEndpoint },
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint },
    NbaAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
