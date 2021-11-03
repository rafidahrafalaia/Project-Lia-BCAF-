import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constants/user';
import { Agency } from '../entity/Agency';
import { Bus } from '../entity/Bus';
import { Kontrak } from '../entity/Kontrak';
import { Role } from '../entity/Role';
 
@Injectable({
  providedIn:'root'
})
export class ApiService{
  agency:Agency[];
  // kontrak:Kontrak[];
  private BASE_URL='http://localhost:8080/api';
  constructor(private http: HttpClient){

  }

  postAuth(email,password){
    var formData: any= new FormData();
    formData.append("email", email);
    formData.append("password",password);
    return this.http.post('http://localhost:8080/api/login',formData);
} 

  cekUser(email){
    return this.http.get<Role>(`${this.BASE_URL}/cekUser?email=${email}`)
} 

getAgencybyId(id){
  console.log('zzzz')
  return this.http.get<Agency>(`${this.BASE_URL}/getAgencyApi?id=${id}`)
} 

setKontrakDocust(kontrak){
  return this.http.post<Kontrak>(`${this.BASE_URL}/setKontrakDocumenCust`,kontrak)
}
setBorrow(kontrak){
  return this.http.post<Kontrak>(`${this.BASE_URL}/setKontrakBorrow`,kontrak)
}

updateKontrak(kontrak){
  return this.http.post<Kontrak>(`${this.BASE_URL}/updateKontrak`,kontrak)
}
setReturnBorrow(kontrak){
  return this.http.post<Kontrak>(`${this.BASE_URL}/setKontrakBorrowReturn`,kontrak)
}
setApproveBorrow(kontrak){
  return this.http.post<Kontrak>(`${this.BASE_URL}/setKontrakBorrowApprove`,kontrak)
}
updateKontrakDetail(kontrak){
  return this.http.post<Kontrak>(`${this.BASE_URL}/updateKontrakDetail`,kontrak)
}

setKontrakArchive(kontrak){
  return this.http.post<Kontrak>(`${this.BASE_URL}/setKontrakArchive`,kontrak)
}

getKontrakDocust(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakDocust`)
}
getKontrakReturnDocust(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakDocustReturned`)
}
getKontrakReturnArchive(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakArchiveReturned`)
}

getKontrakDocustApproval(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakDocustApproval`)
}
getKontrakDocustBorrow(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakDocustBorrow`)
}
getKontrakArchiveBorrow(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakArchiveBorrow`)
}
getKontrakBorrowAll(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getAllKontrakBorrow`)
}
getKontrakReturnAll(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getAllKontrakReturn`)
}

getKontrakArchiveApproval(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakArchiveApproval`)
}

getKontrakDocustRelease(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakDocustRelease`)
}
getKontrakArchive(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakArchive`)
}
getKontrakArchiveRelease(){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakArchiveRelease`)
}

deleteKontrak(kontrak) {
  return this.http.post(`http://localhost:8080/api/deleteKontrak`, kontrak);
}
getKontrakbyNomor(id){
  return this.http.get<Kontrak>(`${this.BASE_URL}/getKontrakNomorAPI?id=${id}`)
} 
register(registerRequest){
  return this.http.post(`${this.BASE_URL}/createNewAccount`,registerRequest)
}  
getUserbyId(id){
  return this.http.get<User>(`${this.BASE_URL}/getUserId?id=${id}`)
}   
  editUserbyId(user){
    return this.http.post<User>(`${this.BASE_URL}/updateProfile`,user)
}

editUserbyIdPass(user){
  return this.http.post<User>(`${this.BASE_URL}/updateProfilePass`,user)
}

  postUpdateKontrak(kontrak){
    return this.http.post<Kontrak>(`${this.BASE_URL}/updateKontrak`,kontrak)
  }
}
