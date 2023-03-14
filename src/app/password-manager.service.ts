import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private readonly firestoreModule: Firestore) {}
  
  saveSite(data: object) {
    const coleccion = collection(this.firestoreModule, 'sites');
    return addDoc(coleccion, data);
  }

}
