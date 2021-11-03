import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './pageLogin/login.module';
import { Page404Component } from './page404/page404.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReciveArchiveComponent } from './pages/recive-archive/recive-archive.component';
// import { ReleaseComponent } from './release/release.component';

import { ExcelService } from '../app/services/excel.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    ReciveArchiveComponent,
    SearchPipe,
    // ReleaseComponent,
    // LoginComponent,
    // RegistrasiComponent,
    // HomeComponent,
    // LayoutComponent,
    // ButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
