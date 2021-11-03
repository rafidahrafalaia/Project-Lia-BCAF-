import { Component, OnInit, ViewChild,Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { AuthService } from 'src/app/auth.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Kontrak } from 'src/app/entity/Kontrak';
import { ExcelService } from '../../services/excel.service';
declare var $: any;
@Component({
  selector: 'app-list-borrrow-docust',
  templateUrl: './list-borrrow-docust.component.html',
  styleUrls: ['./list-borrrow-docust.component.css']
})
export class ListBorrrowDocustComponent implements OnInit {
  public search:any = '';
  locked: any[] = [];
  userData : any;
  code:String;
  noBPKB:String;
  jenisSGU:String;
  capacity:number;
  make:String;
  temp: any;
  editing = {};
  nomorBPKB={};
  rows : any = [];
  categoryList:any=[];
  mydatatable: any;
  kontrak:Kontrak;  
  kontrak2:Kontrak;  

  myVar1 = false;
  myVar2 = false;
  lJenisSGU: any[] = [
    { id:'1', Name: 'Direct Lease ', Code: 'dl' },
    { id:'2', Name: 'Sale & Lease Back', Code: 'slb'}
    ];
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
      this.locked = [
        {ID: 1, User: 'Agustin', AuthID: '68114', FormName: 'Fellman', WinHandle: 'Oak Way'},
        {ID: 2, User: 'Alden', AuthID: '98101', FormName: 'Raccoon Run', WinHandle: 'Newsome'},
        {ID: 3, User: 'Ramon', AuthID: '28586', FormName: 'Yorkshire Circle', WinHandle: 'Dennis'},
        {ID: 4, User: 'Elbert', AuthID: '91775', FormName: 'Lee', WinHandle: 'Middleville Road'},
    ]
    this.categoryList = [
      {id:1, value:'BPKB',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:2,value:'BAST',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:3,value:'CN',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:4,value:'FAKTUR',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:5,value:'POLIS',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:6,value:'SP HAK',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
    ];
  }

  fetchData() {
    let { agencyId } = this.auth.decodeJWT();
    this.api.getKontrakDocustBorrow().subscribe((d) => {
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
      this.nomorBPKB = this.kontrak.nomorBPKB.split(",");
      console.log("length",this.nomorBPKB[0])
      for (var i = 0; i < this.categoryList[0].nomor.length; i++) {
        this.categoryList[0].nomor[i].no = this.kontrak.nomorBPKB.split(",")[i];
      }
      console.log(this.kontrak)
      let dateString = this.kontrak.tglRealisasi 
      let newDate = new Date(dateString);
      console.log("date",newDate)
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 's'})
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

  setNewUser(code: any): void {
    // console.log(code)
    if(code !== null){
    this.kontrak2.jenisSGU=code;
    console.log("try",this.kontrak2.jenisSGU);
  }
    // this.curUser = this.lJenisSGU.filter(value => value.id === parseInt(code));
    // console.log("test",this.curUser)
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

  saveKontrak(nomor){
    // let { agencyId } = this.auth.decodeJWT();
    var noBPKB=this.categoryList[0].nomor[0].no +','+this.categoryList[0].nomor[1].no +','+this.categoryList[0].nomor[2].no +','+this.categoryList[0].nomor[3].no+','+this.categoryList[0].nomor[4].no +','+this.categoryList[0].nomor[5].no +','+this.categoryList[0].nomor[6].no +','+this.categoryList[0].nomor[7].no +','+this.categoryList[0].nomor[8].no +','+this.categoryList[0].nomor[9].no +',';
    console.log('edit',noBPKB,this.kontrak2.jenisSGU,this.kontrak2.keterangan2,this.kontrak.id,this.kontrak.nama, nomor,this.kontrak.jenisSGU,this.kontrak.bpkb,this.kontrak2.bast,this.kontrak.tglRealisasi,this.kontrak2.cn,this.kontrak2.spHak,this.kontrak2.polis,this.kontrak2.faktur)
    this.api.updateKontrakDetail({id:this.kontrak.id,nomor:nomor,jenisSGU:this.kontrak2.jenisSGU,spHak:this.kontrak2.spHak,faktur:this.kontrak2.faktur,polis:this.kontrak2.polis,nama:this.kontrak.nama,approval:true,
      borrow:this.myVar1,bpkb:this.kontrak2.bpkb,persetujuanSGU:this.kontrak2.persetujuanSGU,bast:this.kontrak2.bast,cn:this.kontrak2.cn,tglRealisasi:this.kontrak.tglRealisasi,keterangan2:this.kontrak2.keterangan2,user:this.userData.name, jumlahBPKB:this.kontrak.jumlahBPKB,nomorBPKB:noBPKB}).subscribe((kontrak)=>{ 
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
    // this.api.updateKontrak({ id:this.kontrak.id,nomor:nomor, recive:true,user:this.userData.name,approval:true}).subscribe((kontrak)=>{
      this.api.setApproveBorrow({ id:this.kontrak.id,nomor:nomor,borrow:true}).subscribe((kontrak)=>{
      
    window.location.reload()
      alert("Data Kontrak Telah Di Update")
      // this.modalService.dismissAll();
      // this.myRoute.navigate(["/archiveRecive"]);
    })
  }
  selectedRow2(nomor){
    console.log(nomor) 
    // this.api.updateKontrak({ id:this.kontrak.id,nomor:nomor, recive:true,user:this.userData.name,approval:true}).subscribe((kontrak)=>{
      this.api.setReturnBorrow({ id:this.kontrak.id,nomor:nomor,borrow:false,returned:true}).subscribe((kontrak)=>{
      
    window.location.reload()
      alert("Data Kontrak Telah Di Update")
      // this.modalService.dismissAll();
      // this.myRoute.navigate(["/archiveRecive"]);
    })
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.temp, 'recive_docust');
  }
  selectedRowDelete(nomor){
    console.log(nomor) 
    this.api.deleteKontrak({ id:this.kontrak.id, nomor:nomor}).subscribe((kontrak)=>{  
    window.location.reload()
    alert("Data Kontrak Telah Di Delete")
    })
  }
}
