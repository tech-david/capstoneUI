import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FormsModule } from '@angular/forms';
import { FileDetailComponent } from './file-detail/file-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileSearchComponent } from './file-search/file-search.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    FileDetailComponent,
    MessagesComponent,
    DashboardComponent,
    FileSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
