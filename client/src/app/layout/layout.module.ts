import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgencyComponent } from '../pages/agency/agency.component';
import { BusesComponent } from '../pages/buses/buses.component';
import { ApprovalDocustComponent } from '../pages/approval-docust/approval-docust.component';
import { ApprovalArchiveComponent } from '../pages/approval-archive/approval-archive.component';
import { InputArchiveComponent } from '../pages/input-archive/input-archive.component';
import { ReleaseComponent } from '../pages/release/release.component';
import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { TripsComponent } from '../pages/trips/trips.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { BorrowComponent } from '../pages/borrow/borrow.component';
import { BorrowArchiveComponent } from '../pages/borrow-archive/borrow-archive.component';
import { BorrowAllComponent } from '../pages/borrow-all/borrow-all.component';
import {ListBorrrowArchiveComponent} from '../pages/list-borrrow-archive/list-borrrow-archive.component';
import {ListReturnedDocustComponent} from '../pages/list-returned-docust/list-returned-docust.component';
import {ListBorrrowDocustComponent} from '../pages/list-borrrow-docust/list-borrrow-docust.component';
import {ListReturnedArchiveComponent} from '../pages/list-returned-archive/list-returned-archive.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AgencyComponent,
    TripsComponent,
    ProfileComponent,
    BusesComponent,
    HomeComponent,
    PageNotFoundComponent,
    ReleaseComponent,
    InputArchiveComponent,
    ApprovalDocustComponent,
    ApprovalArchiveComponent,
    BorrowArchiveComponent,
    BorrowComponent,
    ListBorrrowArchiveComponent,
    ListBorrrowDocustComponent,
    BorrowAllComponent,
    ListReturnedDocustComponent,
    ListReturnedArchiveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    LayoutRoutingModule
  ],
})

export class LayoutModule { }