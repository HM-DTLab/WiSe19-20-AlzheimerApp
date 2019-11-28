import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentOverviewComponent } from './content-overview/content-overview.component';
import { TextContentComponent } from './text-content/text-content.component';
import { QrCodePageComponent } from './qr-code-page/qr-code-page.component';

/**
 * Objekt definiert die Routen der App, bspw wird bei Eingabe von localhost:4200/overview auf
 * den Content-Overview Komponeneten gelinkt. Redirects sind auch möglich.
 */
const routes: Routes = [
  { path: 'overview/:id', component: ContentOverviewComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' }, 
  { path: 'text-content/:id', component: TextContentComponent },
  { path: 'start', component: QrCodePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
