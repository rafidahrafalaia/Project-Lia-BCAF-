import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { AuthService } from 'src/app/auth.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Kontrak } from 'src/app/entity/Kontrak';

import { ExcelService } from '../../services/excel.service';
// import { NgbdDropdownNavbar } from './dropdown-navbar';
declare var $: any;

function MyCntrl($scope) {

  $scope.mybool = true;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  public items: Array<{ field: string }> = [
  { field: "Option 1" },
  { field: "Option 2" },
  { field: "Option 3" }
];
  userData : any;
  code:String;
  nomor:String;
  jenisSGU:String;
  capacity:number;
  make:String;
  temp: any;
  editing = {};
  rows : any = [];
  mydatatable: any;
  kontrak:Kontrak;  
  kontrak2:Kontrak;  
  name: string;
  details: string;
  bpkb: boolean;
  polis: boolean;
  cn: boolean;
  spHak: boolean;
  bast: boolean;
  faktur: boolean;
  po2: boolean;
  SPbpkb: boolean;
  jadwalSGU: boolean;
  memoHak: boolean;
  buktiPenerimaan: boolean;
  SPAsuransi: boolean;
  suratKuasa: boolean;
  spAnggaran: boolean;
  persetujuanPasangan: boolean;
  persetujuanKomisaris: boolean;
  buktiPeneyrahan: boolean;
  spNonRUPS: boolean;
  perjanjianJualBeli: boolean;
  pelepasanHak: boolean;
  penyerahanBPKB: boolean;
  jaminan: boolean;
  sp_Direktur: boolean;
  beritaRUPS: boolean;
  sk_Rekening: boolean;
  pelunasan: boolean;
  persetujuanSGU: boolean;
  rekeningBCA: boolean;
  barangModal: boolean;
  fotoGesek: boolean;
  ktpKonsumenPasang: boolean;
  aktaNikah: boolean;
  k_3: boolean;
  kartuKeluarga: boolean;
  npwp2: boolean;
  resumePT: boolean;
  tdp2: boolean;
  siup2: boolean;
  dp2: boolean;
  buktiBayar: boolean;
  ktpPengurus: boolean;
  domisiliPT: boolean;
  dokumenLain: boolean;
  keterangan: string;
  columnInput = [
    { prop: 'id' },{ prop: 'nomor', name: 'Nomor Kontrak', width: 220 },{prop: 'jenisSGU', name: 'jenisSGU'},{prop: 'Actions', name: 'Actions', width:220} ]
  ColumnMode = ColumnMode;
  constructor(
    private api:ApiService,
    private auth: AuthService,
    private myRoute: Router,
    private modalService: NgbModal,
    private excelService: ExcelService 
    ) {

      console.log(auth.isLoggedIn());
  }

  fetchData() {
    let { agencyId } = this.auth.decodeJWT();
    this.api.getKontrakArchive().subscribe((d) => {
      this.temp = d;
      console.log(d);
      this.rows = d;
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.userData = this.auth.decodeJWT();
    console.log(this.userData.name)
    $('#sidebarToggle, #sidebarToggleTop').on('click', function (e) {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      if ($('.sidebar').hasClass('toggled')) {
        $('.sidebar .collapse').collapse('hide');
      }
    });
  }

  open(content,id){
    console.log(id)
    this.api.getKontrakbyNomor(id).subscribe((item)=>{
      this.kontrak=item;
      this.kontrak2=item;
      console.log(this.kontrak)
      let dateString = this.kontrak.tglRealisasi 
      let newDate = new Date(dateString);
      console.log("date",newDate)
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      // this.modalService.open(content)
    })
  }
  opencek(content,nomor){
    
    console.log(nomor)
    this.api.getKontrakbyNomor(nomor).subscribe((item)=>{
      this.kontrak=item;
      this.kontrak2=item;
      console.log(this.kontrak)
      this.modalService.open(content)
    })
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.temp, 'recive_archive');
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED! ROW', this.rows);
    console.log('UPDATED!', this.rows[rowIndex]);
    this.api.postUpdateKontrak(this.rows[rowIndex]).subscribe();
  }

  setNewUser(code: any): void {
    // console.log(code)
    if(code !== null){
    this.kontrak2.jenisSGU=code;
    console.log("try",this.kontrak2.jenisSGU);
  }
}
  doLogout(){
    this.auth.logout();
    alert("Anda Berhasil LogOut")
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    console.log('searh', val)
    // filter our data
    console.log('searhzz', this.rows)
    const temp = this.temp.filter(function (d) {
      return d.code.toLowerCase().indexOf(val) !== -1 || !val;
    });
    
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.mydatatable.offset = 0;
  }

  saveKontrak(nomor){
    // let { agencyId } = this.auth.decodeJWT();
    console.log('edit',this.kontrak.id,this.kontrak.nama, nomor,this.kontrak.jenisSGU,this.kontrak.buktiBayar,this.kontrak2.jadwalSGU,this.kontrak.tglRealisasi)
    this.api.updateKontrakDetail({id:this.kontrak.id,approval:true,nomor:nomor,jenisSGU:this.kontrak2.jenisSGU,po2:this.kontrak2.po2,sp_Bpkb:this.kontrak2.sp_Bpkb,jadwalSGU:this.kontrak2.jadwalSGU,nama:this.kontrak.nama,
    pelunasan:this.kontrak2.pelunasan,persetujuanSGU:this.kontrak2.persetujuanSGU,dp2:this.kontrak2.dp2,buktiBayar:this.kontrak2.buktiBayar,tglRealisasi:this.kontrak.tglRealisasi,keterangan2:this.kontrak2.keterangan2,user:this.userData.name}).subscribe((bus)=>{ 
      window.location.reload()
      alert("done edit"); 
        //  this.itemEdit.expiredDate = (new Date(this.dpick.year, this.dpick.month-1, this.dpick.day )).getTime() / 1000
      // this.api.getBusbyId(agencyId).subscribe((d) => {
      //   this.temp = d;
      //   console.log(d)
      //   this.rows = d;
      // })
    });
  }

  selectedRow(nomor){
    console.log(nomor) 
    this.api.updateKontrak({ id:this.kontrak.id,nomor:nomor, approval:true,recive:false}).subscribe((kontrak)=>{
      
    window.location.reload()
      alert("Data Kontrak Telah Di Update")
      // this.modalService.dismissAll();
      // this.myRoute.navigate(["/archiveRecive"]);
    })
  }
  
  selectedRowDelete(nomor){
    console.log(nomor) 
    this.api.deleteKontrak({ id:this.kontrak.id, nomor:nomor, recive:false}).subscribe((kontrak)=>{  
    window.location.reload()
    alert("Data Kontrak Telah Di Delete")
    })
  }

}
