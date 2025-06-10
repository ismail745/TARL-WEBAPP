import { Injectable } from '@angular/core';
import { getDatabase, ref, get, set, update, remove, push } from 'firebase/database';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private db = getDatabase();

  // Récupérer toutes les classes
  getAllClasses(): Observable<any> {
    return from(get(ref(this.db, 'classes')).then(snapshot => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    }));
  }

  // Créer une nouvelle classe
  createClass(classData: any): Observable<any> {
    const newClassRef = ref(this.db, `classes/class_${Date.now()}`);
    const newClass = {
      ...classData,
      id: `class_${Date.now()}`,
      teacher: null,
      students: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return from(set(newClassRef, newClass));
  }

  // Mettre à jour une classe
  updateClass(id: string, classData: any): Observable<any> {
    const updates = {
      ...classData,
      updatedAt: new Date().toISOString()
    };
    return from(update(ref(this.db, `classes/${id}`), updates));
  }

  // Supprimer une classe
  deleteClass(id: string): Observable<any> {
    return new Observable(observer => {
      const classRef = ref(this.db, `classes/${id}`);
      remove(classRef)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}