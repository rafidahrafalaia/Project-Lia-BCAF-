import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { AuthService } from 'src/app/auth.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';

import { Kontrak } from 'src/app/entity/Kontrak';
declare var $: any;
@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {
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

  columnInput = [
    { prop: 'id' },{ prop: 'nomor', name: 'Nomor Kontrak', width: 220 },{prop: 'jenisSGU', name: 'jenisSGU'} ]
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

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.temp, 'release_docust');
  }
  fetchData() {
    let { agencyId } = this.auth.decodeJWT();
    this.api.getKontrakDocustRelease().subscribe((d) => {
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

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED! ROW', this.rows);
    console.log('UPDATED!', this.rows[rowIndex]);
    this.api.postUpdateKontrak(this.rows[rowIndex]).subscribe();
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

  setNewUser(code: any): void {
    // console.log(code)
    if(code !== null){
    this.kontrak2.jenisSGU=code;
    console.log("try",this.kontrak2.jenisSGU);
  }
    // this.curUser = this.lJenisSGU.filter(value => value.id === parseInt(code));
    // console.log("test",this.curUser)
    }
  saveKontrak(nomor){
    // let { agencyId } = this.auth.decodeJWT();
    console.log('edit',this.kontrak2.jenisSGU,this.kontrak2.keterangan,this.kontrak.id,this.kontrak.nama, nomor,this.kontrak.jenisSGU,this.kontrak.bpkb,this.kontrak2.bast,this.kontrak.tglRealisasi,this.kontrak2.cn,this.kontrak2.spHak,this.kontrak2.polis,this.kontrak2.faktur)
    this.api.updateKontrakDetail({id:this.kontrak.id,nomor:nomor,jenisSGU:this.kontrak2.jenisSGU,spHak:this.kontrak2.spHak,faktur:this.kontrak2.faktur,polis:this.kontrak2.polis,nama:this.kontrak.nama,approval:true,
      bpkb:this.kontrak2.bpkb,persetujuanSGU:this.kontrak2.persetujuanSGU,bast:this.kontrak2.bast,cn:this.kontrak2.cn,tglRealisasi:this.kontrak.tglRealisasi,keterangan2:this.kontrak2.keterangan2,user:this.userData.name}).subscribe((bus)=>{ 
      window.location.reload()
      alert("done edit"); 
      window.location.reload()
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
    this.api.updateKontrak({ id:this.kontrak.id,nomor:nomor, recive:true,user:this.userData.name,approval:true}).subscribe((kontrak)=>{
      
    window.location.reload()
      alert("Data Kontrak Telah Di Update")
      // this.modalService.dismissAll();
      // this.myRoute.navigate(["/archiveRecive"]);
    })
  }
  
  selectedRowDelete(nomor){
    console.log(nomor) 
    this.api.deleteKontrak({ id:this.kontrak.id, nomor:nomor, recive:true}).subscribe((kontrak)=>{  
    window.location.reload()
    alert("Data Kontrak Telah Di Delete")
    })
  }
}
