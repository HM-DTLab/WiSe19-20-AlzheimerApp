import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentOverviewComponent } from './content-overview/content-overview.component';
import { TextContentComponent } from './text-content/text-content.component';

/**
 * Objekt definiert die Routen der App, bspw wird bei Eingabe von localhost:4200/overview auf
 * den Content-Overview Komponeneten gelinkt. Redirects sind auch möglich.
 */
const routes: Routes = [
  { path: 'overview', component: ContentOverviewComponent},
  { path: '', redirectTo: 'overview', pathMatch: 'full' }, 
  { path: 'text-content/:id', component: TextContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
