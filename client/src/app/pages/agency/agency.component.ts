import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ApiService } from 'src/app/utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/entity/Agency';
import { createWorker } from 'tesseract.js';
import { Kontrak } from 'src/app/entity/Kontrak';
import { BPKB } from 'src/app/entity/BPKB';
declare var $: any;
@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css'],
})
export class AgencyComponent implements OnInit {
  userData : any;
  newBPKB:BPKB;
  fileToUpload: File = null;
  isMasterSel:boolean;
  categoryList:any;
  checkedCategoryList:any;
  roleDokumen: string;
  nama: string;
  id: string;
  details: string;
  kontrak: Kontrak;
  nomor: string;
  jenisSGU: string;
  tglRealisasi: Date;
  bpkb: boolean;
  polis: boolean;
  cn: boolean;
  spHak: boolean;
  bast: boolean;
  faktur: boolean;
  keterangan: boolean;
  temp: any;
  ocrResult:String;
  editing = {};
  rows : any = [];
  mydatatable: any;
  lJenisSGU: any[] = [
    { id:'1', Name: 'Direct Lease', Code: 'dl' },
    { id:'2', Name: 'Sale & Lease Back', Code: 'slb'}
    ];
curUser: any;
  constructor(
    private route: ActivatedRoute,
    private myRouter: Router,
    public auth: AuthService,
    private apiService: ApiService,
   
  ) {
    console.log(auth.isLoggedIn());
    this.isMasterSel = false;
    
    this.categoryList = [
      {id:1, value:'BPKB',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:2,value:'BAST',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:3,value:'CN',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:4,value:'FAKTUR',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:5,value:'POLIS',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
      {id:6,value:'SP HAK',isSelected:false, jumlah:0,nomor:[{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''},{no:''}]},
    ];
    
    this.getCheckedItemList();
    this.kontrak=new Kontrak;
    this.kontrak.bpkb=false;
    this.kontrak.bast=false;
    this.kontrak.cn=false;
    this.kontrak.faktur=false;
    this.kontrak.polis=false;
    this.kontrak.spHak=false;
  }

  ngOnInit(): void {
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
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
    this.tesseract();
}
 
tesseract(){
  const worker = createWorker({
  logger: m => console.log(m)
  });
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(this.fileToUpload);
    this.kontrak.keterangan=text;
    console.log(text);
    await worker.terminate();
  })();
 }
  checkUncheckAll() {
    for (var i = 0; i < this.categoryList.length; i++) {
      this.categoryList[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }
   
  isAllSelected() {
    this.isMasterSel = this.categoryList.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
  
  getCheckedItemList(){
    this.checkedCategoryList = [];
    for (var i = 0; i < this.categoryList.length; i++) {
      if(this.categoryList[i].isSelected){
        this.categoryList[i].jumlah=1;
      this.checkedCategoryList.push(this.categoryList[i]);
      }
    }
    this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  }
  
  doLogout(){
    this.auth.logout();
    alert("Anda Berhasil LogOut")
  }
  getAgency() {
    let jwt = this.auth.decodeJWT();
    console.log('jwt', jwt);
    this.apiService.getAgencybyId(jwt.agencyId)
      .subscribe((kontrak) => {
        console.log('kontrak', kontrak);
        this.kontrak = this.kontrak;
    });
  }
  setNewUser(code: any): void {
    this.kontrak.jenisSGU=code;
    console.log("try",this.kontrak.jenisSGU);
    // this.curUser = this.lJenisSGU.filter(value => value.id === parseInt(code));
    // console.log("test",this.curUser)
    }
  updateKontrak(){
    let jwt=this.auth.decodeJWT(); 
    console.log("kontrak",this.kontrak.jenisSGU,this.kontrak.nama,this.categoryList[3].isSelected,this.categoryList[0].isSelected,this.kontrak.tglRealisasi,this.categoryList[0].nomor,this.categoryList[1].nomor)
    var nomor=this.categoryList[0].nomor[0].no +','+this.categoryList[0].nomor[1].no +','+this.categoryList[0].nomor[2].no +','+this.categoryList[0].nomor[3].no+','+this.categoryList[0].nomor[4].no +','+this.categoryList[0].nomor[5].no +','+this.categoryList[0].nomor[6].no +','+this.categoryList[0].nomor[7].no +','+this.categoryList[0].nomor[8].no +','+this.categoryList[0].nomor[9].no +',';
    // console.log(nomor, this.categoryList[0].jumlah,this.categoryList[1].jumlah);
      this.apiService.setKontrakDocust({nama:this.kontrak.nama, recive:true, nomor:this.kontrak.nomor, jenisSGU:this.kontrak.jenisSGU, tglRealisasi:this.kontrak.tglRealisasi, bpkb:this.categoryList[0].isSelected, cn:this.categoryList[1].isSelected,
        bast:this.categoryList[2].isSelected,faktur:this.categoryList[3].isSelected,polis:this.categoryList[4].isSelected,spHak:this.categoryList[5].isSelected,keterangan2:this.kontrak.keterangan,user:this.userData.name, jumlahBPKB:this.categoryList[0].jumlah,nomorBPKB:nomor,approval:false}).subscribe((agency)=>{
          alert("Data Kontrak Telah Di Update")
          window.location.reload()
    })
  }
}
