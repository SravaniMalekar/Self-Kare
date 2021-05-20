import { Injectable } from '@angular/core';
import {Data, User} from "../services/user"
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData :any;


  constructor(public afs: AngularFirestore,public afAuth: AngularFireAuth,public router: Router){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));

      }else{
        localStorage.setItem('user','');
      }
    })
  }

  //Sign up with email/password
  emailSignup(email : string, password: string){

    return this.afAuth.createUserWithEmailAndPassword(email,password).then((result)=>{
      console.log("sucess",result);
      this.SetUserData(result.user);
      setTimeout(()=>this.router.navigateByUrl('/main-dashboard'),20);
    }).catch((error)=>{
      window.alert(error.message)
    })
  }

  //Login using email and password
  login(email: string, password: string){

    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
      this.SetUserData(result.user);
      console.log('Logged In');
      setTimeout(()=>this.router.navigateByUrl('/main-dashboard'),20);
      
    }).catch((error)=>{
      window.alert(error.message)
    })
  }

  // loginGoogle(){
  //   return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result)=>{
  //     console.log('google login');
  //     this.router.navigateByUrl('/main-dashboard');
  //     this.SetUserData(result.user);
  //   }).catch((error)=>{
  //     window.alert(error);
  //   })
  // }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  //Signout
  SignOut(){
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigateByUrl('/auth');
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
  const user = localStorage.getItem('user');
  return (user !== '' ? true : false);
}

  //adding doc to userlog collection
  addDocToCollection(data: Data){
    const id = this.afs.createId();
    const dataDoc = this.afs.doc(`users/${this.userData.uid}`);
    const dataS = {...data,id:id};
    return dataDoc.collection('Userlogs').doc(id).set(dataS,{merge:true}).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    })
  }

  //get user data from firestore collection
  async getDocumentsCollection(){
    let userlogData: Array<any> = [];
    const docRef = this.afs.collection(`users/${this.userData.uid}/Userlogs`);
    let snapshot = await docRef.get();
    snapshot.forEach(doc => {
      doc.forEach(data=> userlogData.push(data.data()));
    });
    return userlogData;
    }
}

