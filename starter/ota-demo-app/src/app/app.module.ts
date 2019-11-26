import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './users/users.module';
import { ReadPointModule } from './read-points/read-points.module';
import { UserProxyService } from 'src/services/user-proxy.service';
import { ReadPointProxyService } from 'src/services/read-point-proxy.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    ReadPointModule
  ],
  providers: [UserProxyService, ReadPointProxyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
