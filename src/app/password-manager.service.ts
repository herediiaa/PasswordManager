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
}
