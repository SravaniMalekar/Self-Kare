import { Injectable } from '@angular/core';
import {User} from "../services/user"
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
      this.router.navigateByUrl('/main-dashboard')
    }).catch((error)=>{
      window.alert(error.message)
    })
  }

  //Login using email and password
  login(email: string, password: string){

    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
      console.log('Logged In');
      this.router.navigateByUrl('/main-dashboard');
      this.SetUserData(result.user);
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

  SignOut(){
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigateByUrl('/auth');
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
  const user = localStorage.getItem('user');
  return (user !== null ? true : false);
}

}
