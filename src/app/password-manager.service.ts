import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Site } from './interfaces/sitesInfo.interface';
@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private readonly firestoreModule: Firestore) {}

  saveSite(data: Site) {
    const coleccion = collection(this.firestoreModule, 'sites');
    return addDoc(coleccion, data);
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

  /* Password-list querys */
  addPasswords(data: any, siteId: string) {
    const dbSubCollection = collection(
      this.firestoreModule,
      `sites/${siteId}/passwords`
    );
    return addDoc(dbSubCollection, data);
  }
  loadPasswords(siteId: string) {
    const dbSubCollection = collection(
      this.firestoreModule,
      `sites/${siteId}/passwords`
    );
    return collectionData(dbSubCollection, { idField: 'id' });
  }

  editPassword(passwordId:string, siteId:string, data:any){
    delete data.id
    const document = doc(this.firestoreModule, `sites/${siteId}/passwords`, passwordId)
    return updateDoc(document, data)
  }
  deletePassword(id:string,siteId:string){
    const dbSubCollection = doc(this.firestoreModule, `sites/${siteId}/passwords`,id )
    return deleteDoc(dbSubCollection)
  }
}
