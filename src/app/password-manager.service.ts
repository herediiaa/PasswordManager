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

  /* va a crear un usuario en el caso de que el usuario NO este en la base de datos */
  createUser(email: string) {
    /* instanciamos la coleccion donde debemos agregar el usuario si es necesario */
    const userCollection = collection(this.firestoreModule, 'users');

    // consultamos a nuestra coleccion con un query de filtracion where 
    /* para traer dentro de la colecion un documento que contenga un mail ya registardo */
    const q = query(userCollection, where('email', '==', email));
    
    // ejecutamos y traemos los documentos de la coleccion instanciada
    return getDocs(q).then((querySnapshot) => {
      /* como promesa devuelve la respuesta */
      if (!querySnapshot.empty) {
        /* si trae algo */
        // Ya existe un documento con el mismo correo electrónico
        /* devolvemos */
        return Promise.reject('Ya existe un usuario con este correo electrónico');
        
      }
      // No existe un documento con el mismo correo electrónico, crea uno nuevo
      /* si no trae nada, es por que no se encontro un documento con el email proporcionado
      por lo que no existe, no esta registrado */
      /* devolvemos el documento de referencia de lo que generamos */
      return addDoc(userCollection, { email }).then((userRefDoc) => {
        /* addDoc nos permite guardar data en un lugar de la base de datos */
        console.log('Document ID:', userRefDoc.id);/* referencia del id de coleccion en el que se guardo nuestra data */
        /* guardamos en el localStorage ese id, nos servira ya que sabremos la ruta
        users/userRefDoc.id */
        localStorage.setItem('userId', JSON.stringify(userRefDoc.id));
        /* avisamos que creamos un usuario */
        console.log('colection de users creada passwordMnager');
      });
    });
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
