import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  getDocs,
  where,
} from '@angular/fire/firestore';
import { Site } from './interfaces/sitesInfo.interface';
import { JsonPipe } from '@angular/common';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private readonly firestoreModule: Firestore) {}

  saveSite(data: Site, path: string) {
    const coleccion = collection(
      this.firestoreModule,
      `users/${JSON.parse(localStorage.getItem('userId')!)}/sites`
    );
    return addDoc(coleccion, data);
  }

  /*   async verifiedUser(email: string) {
    let response!: Boolean;
    const dbSubCollection = collection(this.firestoreModule, 'users');
    const a: any = query(dbSubCollection, where('email', '==', email));
    const doc = await getDocs(a);
    if (!doc.empty) {
      console.log(doc);
      console.log('el usuario Ya esta en uso');
      response = false;
    } else {
      console.log(doc);

      console.log('el usuario No esta registrado');
      response = true;
    }
    return response;
  } */

  /* verificacion de usuario en DB */
  async isUser(userData: any) {
    const usuarioEmail = query(collection(this.firestoreModule, 'users'), where('email', '==', userData.email));
    const usuarioDoc = await getDocs(usuarioEmail)
    let response:string = 'user register'
      if (usuarioDoc.empty) {
        console.log(`user ${userData.email} is not register`)
        response = 'user not register'
      }
      return response
    
  }

  async createUser(data: any) {
    const userDocument = await addDoc(collection(this.firestoreModule, 'users'), data);
    /* user documento reference */
    localStorage.setItem('userPath', JSON.stringify(userDocument.id));/* id del docuemnto en DB */
    console.log(`usuario con id ${userDocument.id} creado`);
  }

  /* Password-list querys */
  addPasswords(data: any, siteId: string) {
    const dbSubCollection = collection(
      this.firestoreModule,
      `sites/${siteId}/passwords`
    );
    return addDoc(dbSubCollection, data);
  }

  getSites() {
    const coleccion = collection(this.firestoreModule, 'sites');
    return collectionData(coleccion, { idField: 'id' });
  }

  editSite(id: string, data: any) {
    const document = doc(this.firestoreModule, 'sites', id);
    return updateDoc(document, data);
  }

  deliteSite(id: string) {
    const document = doc(this.firestoreModule, 'sites', id);
    return deleteDoc(document);
  }

  loadPasswords(siteId: string) {
    const dbSubCollection = collection(
      this.firestoreModule,
      `sites/${siteId}/passwords`
    );
    return collectionData(dbSubCollection, { idField: 'id' });
  }

  editPassword(passwordId: string, siteId: string, data: any) {
    delete data.id;
    const document = doc(
      this.firestoreModule,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return updateDoc(document, data);
  }
  deletePassword(id: string, siteId: string) {
    const dbSubCollection = doc(
      this.firestoreModule,
      `sites/${siteId}/passwords`,
      id
    );
    return deleteDoc(dbSubCollection);
  }
}
