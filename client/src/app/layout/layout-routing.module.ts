import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AgencyComponent } from '../pages/agency/agency.component';
import { TripsComponent } from '../pages/trips/trips.component';
import { ReleaseComponent } from '../pages/release/release.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { BusesComponent } from '../pages/buses/buses.component';
import { InputArchiveComponent } from '../pages/input-archive/input-archive.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { ReciveArchiveComponent } from '../pages/recive-archive/recive-archive.component';
import { ApprovalArchiveComponent } from '../pages/approval-archive/approval-archive.component';
import { ApprovalDocustComponent } from '../pages/approval-docust/approval-docust.component';
import { BorrowComponent } from '../pages/borrow/borrow.component';
import { BorrowArchiveComponent } from '../pages/borrow-archive/borrow-archive.component';
import { BorrowAllComponent } from '../pages/borrow-all/borrow-all.component';
import { ListBorrrowDocustComponent } from '../pages/list-borrrow-docust/list-borrrow-docust.component';
import { ListBorrrowArchiveComponent } from '../pages/list-borrrow-archive/list-borrrow-archive.component';

import {ListReturnedDocustComponent} from '../pages/list-returned-docust/list-returned-docust.component';
import {ListReturnedArchiveComponent} from '../pages/list-returned-archive/list-returned-archive.component';
const routes: Routes = [
  { path: 'archiveRecive', component: HomeComponent},
  { path: '', component: AgencyComponent},
  { path: 'docustRecive', component: TripsComponent},
  { path: 'docustInput', component: ReciveArchiveComponent},
  { path: 'docustRelease', component: ReleaseComponent},
  { path: 'archiveRelease', component: ProfileComponent},
  { path: 'archive', component: BusesComponent},
  { path: 'archiveInput', component: InputArchiveComponent},
  { path: 'approvalDocust', component: ApprovalDocustComponent},
  { path: 'approvalArchive', component: ApprovalArchiveComponent},
  { path: 'page404', component: PageNotFoundComponent},
  { path: 'borrowArchive', component: BorrowArchiveComponent},
  { path: 'borrowAll', component: BorrowAllComponent},
  { path: 'borrowAllDocust', component: ListBorrrowDocustComponent},
  { path: 'borrowAllArchive', component: ListBorrrowArchiveComponent},
  { path: 'returnAllDocust', component: ListReturnedDocustComponent},
  { path: 'returnAllArchive', component: ListReturnedArchiveComponent},
  { path: 'borrowDocust', component: BorrowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule {}