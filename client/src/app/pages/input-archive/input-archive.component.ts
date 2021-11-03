import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { AuthService } from 'src/app/auth.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Bus } from 'src/app/entity/Bus';

import { createWorker } from 'tesseract.js';
import { Kontrak } from 'src/app/entity/Kontrak';

declare var $: any;
@Component({
  selector: 'app-input-archive',
  templateUrl: './input-archive.component.html',
  styleUrls: ['./input-archive.component.css']
})
export class InputArchiveComponent implements OnInit {
  userData : any;
  fileToUpload: File = null;
  code:String;
  capacity:number;
  make:String;
  temp: any;
  editing = {};
  rows : any = [];
  mydatatable: any;
  name: string;
  details: string;
  kontrak: Kontrak;
  nomor: string;
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
  ColumnMode = ColumnMode;
  isMasterSel:boolean;
  isMasterSel2:boolean;
  categoryList:any;
  categoryList2:any;
  checkedCategoryList:any;
  checkedCategoryList2:any;
  lJenisSGU: any[] = [
    { id:'1', Name: 'Direct Lease', Code: 'dl' },
    { id:'2', Name: 'Sale & Lease Back', Code: 'slb'}
    ];
  constructor(
    private api:ApiService,
    private auth: AuthService,
    private modalService: NgbModal,
    private apiService: ApiService
    ) {
      this.isMasterSel = false;
      console.log(auth.isLoggedIn());
      this.categoryList = [
        {id:1, value:'PO',isSelected:false},
        {id:2,value:'SP BPKB',isSelected:false},
        {id:3,value:'Jadwal Perjanjian SGU',isSelected:false},
        {id:4,value:'Memo Hak Opsi',isSelected:false},
        {id:5,value:'Bukti Penerimaan Barang',isSelected:false},
        {id:6,value:'SP Asuransi',isSelected:false},
        {id:7,value:'Surat Kuasa',isSelected:false},
        {id:8,value:'SP Anggaran Dasar',isSelected:false},
        {id:9,value:'Surat Persetujuan Pasangan',isSelected:false},
        {id:10,value:'Surat Persetujuan Komisaris',isSelected:false},
        {id:11,value:'Bukti Penyerahan Barang',isSelected:false},
        {id:12,value:'SP Tanpa RUPS',isSelected:false},
        {id:13,value:'Perjanjian Jual Beli',isSelected:false},
        {id:14,value:'Surat Pernyataan Pelepasan Hak',isSelected:false},
        {id:15,value:'SP Penyerahan BPKB',isSelected:false},
        {id:16,value:'Surat Jaminan',isSelected:false},
        {id:17,value:'SP Direktur',isSelected:false},
        {id:18,value:'Berita Acara RUPS',isSelected:false},
        {id:19,value:'Surat Kuasa Pendebetan Rekening',isSelected:false}
      ];

      this.isMasterSel2 = false;
    
      this.categoryList2 = [
        {id:20, value:'Kuitansi Pelunasan',isSelected:false},
        {id:21,value:'Kuitansi DP',isSelected:false},
        {id:22,value:'Memo Persetujuan SGU',isSelected:false},
        {id:23,value:'Bukti Bayar Provisi/Asuransi',isSelected:false},
        {id:24,value:'Rekening BCA',isSelected:false},
        {id:25,value:'Lampiran Daftar Barang Modal',isSelected:false},
        {id:26,value:'Foto + Gesekan',isSelected:false},
        {id:27,value:'KTP Konsumen + Pasangan',isSelected:false},
        {id:28,value:'Akta Nikah',isSelected:false},
        {id:29,value:'K3',isSelected:false},
        {id:30,value:'Kartu Keluarga',isSelected:false},
        {id:31,value:'NPWP',isSelected:false},
        {id:32,value:'Resume PT',isSelected:false},
        {id:33,value:'TDP',isSelected:false},
        {id:34,value:'SIUP',isSelected:false},
        {id:35,value:'KTP Pengurus',isSelected:false},
        {id:36,value:'Surat Keterangan Domisili PT',isSelected:false},
        {id:37,value:'Dokumen Lainnya',isSelected:false}
      ];
      
    this.getCheckedItemList();
    // this.getCheckedItemList2();
      this.kontrak=new Kontrak;
      this.kontrak.domisiliPT=false;
      this.kontrak.dokumenLain=false;
      this.kontrak.cn=false;
      this.kontrak.ktpPengurus=false;
      this.kontrak.buktiBayar=false;
      this.kontrak.DP=false;
      this.kontrak.SIUP=false;
      this.kontrak.TDP=false;
      this.kontrak.NPWP=false;
      this.kontrak.resumePT=false;
      this.kontrak.aktaNikah=false;
      this.kontrak.kartuKeluarga=false;
      this.kontrak.K3=false;
      this.kontrak.FotoGesekan=false;
      this.kontrak.KTPKonsumenPasangan=false;
      this.kontrak.barangModal=false;
      this.kontrak.rekeningBCA=false;
      this.kontrak.buktiBayar=false;
      this.kontrak.persetujuanSGU=false;
      this.kontrak.pelunasan=false;
      this.kontrak.SKRekening=false;
      this.kontrak.beritaRUPS=false;
      this.kontrak.SPDirektur=false;
      this.kontrak.jaminan=false;
      this.kontrak.penyerahanBPKB=false;
      this.kontrak.pelepasanHak=false;
      this.kontrak.perjanjianJualBeli=false;
      this.kontrak.SPtanpaRUPS=false;
      this.kontrak.buktiPeneyrahan=false;
      this.kontrak.persetujuanKomisaris=false;
      this.kontrak.persetujuanPasangan=false;
      this.kontrak.spAnggaran=false;
      this.kontrak.suratKuasa=false;
      this.kontrak.SPAsuransi=false;
      this.kontrak.buktiPenerimaan=false;
      this.kontrak.memoHak=false;
      this.kontrak.jadwalSGU=false;
      this.kontrak.SPbpkb=false;
  }

  doLogout(){
    this.auth.logout();
    alert("Anda Berhasil LogOut")
  }
  ngOnInit(): void {
    console.log(this.categoryList[0].value)
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
      if(this.categoryList[i].isSelected)
      this.checkedCategoryList.push(this.categoryList[i]);
    }
    this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  }
  checkUncheckAll2() {
    for (var i = 0; i < this.categoryList2.length; i++) {
      this.categoryList2[i].isSelected = this.isMasterSel2;
    }
    this.getCheckedItemList2();
  }
   
  isAllSelected2() {
    this.isMasterSel2 = this.categoryList2.every(function(item2:any) {
        return item2.isSelected == true;
      })
    this.getCheckedItemList2();
  }
  setNewUser(code: any): void {
    this.kontrak.jenisSGU=code;
    console.log("try",this.kontrak.jenisSGU);
    // this.curUser = this.lJenisSGU.filter(value => value.id === parseInt(code));
    // console.log("test",this.curUser)
    }
  getCheckedItemList2(){
    this.checkedCategoryList2 = [];
    for (var i = 0; i < this.categoryList2.length; i++) {
      if(this.categoryList2[i].isSelected)
      this.checkedCategoryList2.push(this.categoryList2[i]);
    }
    this.checkedCategoryList2 = JSON.stringify(this.checkedCategoryList2);
  }
  updateKontrak(){
    let jwt=this.auth.decodeJWT(); 
    // console.log("kontrak",this.kontrak.nomor,this.kontrak.nama, this.kontrak.bast,this.kontrak.bpkb, this.kontrak.cn);
      this.apiService.setKontrakArchive({nama:this.kontrak.nama, nomor:this.kontrak.nomor, jenisSGU:this.kontrak.jenisSGU, tglRealisasi:this.kontrak.tglRealisasi, recive:true,
        po2:this.categoryList[0].isSelected,sp_Bpkb:this.categoryList[1].isSelected,jadwalSGU:this.categoryList[2].isSelected,memoHak:this.categoryList[3].isSelected,buktiPenerimaan:this.categoryList[4].isSelected,
        sp_asuransi:this.categoryList[5].isSelected,suratKuasa:this.categoryList[6].isSelected,spAnggaran:this.categoryList[7].isSelected,persetujuanPasangan:this.categoryList[8].isSelected,
    persetujuanKomisaris:this.categoryList[9].isSelected,buktiPeneyrahan:this.categoryList[10].isSelected,spNonRUPS:this.categoryList[11].isSelected,perjanjianJualBeli:this.categoryList[12].isSelected,
  pelepasanHak:this.categoryList[13].isSelected,penyerahanBPKB:this.categoryList[14].isSelected,jaminan:this.categoryList[15].isSelected,sp_Direktur:this.categoryList[16].isSelected,
beritaRUPS:this.categoryList[17].isSelected,sk_Rekening:this.categoryList[18].isSelected,pelunasan:this.categoryList2[0].isSelected,dp2:this.categoryList2[1].isSelected,persetujuanSGU:this.categoryList2[2].isSelected,
buktiBayar:this.categoryList2[3].isSelected,rekeningBCA:this.categoryList2[4].isSelected,barangModal:this.categoryList2[5].isSelected,foto_Gesekan:this.categoryList2[6].isSelected,ktpKonsumenPasang:this.categoryList2[7].isSelected,
aktaNikah:this.categoryList2[8].isSelected,k_3:this.categoryList2[9].isSelected,kartuKeluarga:this.categoryList2[10].isSelected,npwp2:this.categoryList2[11].isSelected,resumePT:this.categoryList2[12].isSelected,
tdp2:this.categoryList2[13].isSelected,siup2:this.categoryList2[14].isSelected,ktpPengurus:this.categoryList2[15].isSelected,domisiliPT:this.categoryList2[16].isSelected,dokumenLain:this.categoryList2[17].isSelected,keterangan2:this.kontrak.keterangan2,user:this.userData.name}).subscribe((kontrak)=>{
          alert("Data Kontrak Telah Di Update")
          window.location.reload()
    })
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
  // open(content) {
  //   console.log('content', content);
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  // }

  // updateValue(event, cell, rowIndex) {
  //   console.log('inline editing rowIndex', rowIndex);
  //   this.editing[rowIndex + '-' + cell] = false;
  //   this.rows[rowIndex][cell] = event.target.value;
  //   this.rows = [...this.rows];
  //   console.log('UPDATED! ROW', this.rows);
  //   console.log('UPDATED!', this.rows[rowIndex]);
  //   this.api.postUpdateBus(this.rows[rowIndex]).subscribe();
  // }

  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();

  //   console.log('searh', val)
  //   // filter our data
  //   console.log('searhzz', this.rows)
  //   const temp = this.temp.filter(function (d) {
  //     return d.code.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
    
  //   // update the rows
  //   this.rows = temp;
  //   // Whenever the filter changes, always go back to the first page
  //   this.mydatatable.offset = 0;
  // }

  // saveBus(){
  //   let { agencyId } = this.auth.decodeJWT();
  //   console.log('add bus', this.code,this.capacity,this.make,agencyId)
  //   this.api.addBus({make:this.make,code:this.code,capacity:this.capacity,agencyId:agencyId}).subscribe((bus)=>{ 
  //     alert("done add");      // this.itemEdit.expiredDate = (new Date(this.dpick.year, this.dpick.month-1, this.dpick.day )).getTime() / 1000
  //     this.api.getBusbyId(agencyId).subscribe((d) => {
  //       this.temp = d;
  //       console.log(d)
  //       this.rows = d;
  //     })
  //   });
  // }
}