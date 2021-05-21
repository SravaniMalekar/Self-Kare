import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Data } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private authService: AuthService,public afs: AngularFirestore) {
   }

     //adding doc to userlog collection
  addDocToCollection(data: Data){
    const id = this.afs.createId();
    const dataDoc = this.afs.doc(`users/${this.authService.userData.uid}`);
    const dataS = {...data,id:id};
    return dataDoc.collection('Userlogs').doc(id).set(dataS,{merge:true}).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    })
  }

  //get user data from firestore collection
  async getDocumentsCollection(){
    const uid = JSON.parse(JSON.stringify(localStorage.getItem('uid'))); 
    console.log(uid);
    let userlogData: Array<any> = [];
    const docRef = this.afs.collection(`users/${this.authService.userData.uid}/Userlogs`);
    let snapshot = await docRef.get();
    snapshot.forEach(doc => {
      doc.forEach(data=> userlogData.push(data.data()));
    });
    return userlogData;
    }
    
}
