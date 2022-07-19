import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileDetailComponent } from './file-detail/file-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'files', component: FileUploaderComponent },
  { path: 'detail/id', component: FileDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
