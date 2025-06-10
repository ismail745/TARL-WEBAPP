import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor() { }
    private ParentToEdit = new BehaviorSubject<string>('');
    currentParent = this.ParentToEdit.asObservable();
  
    setSelectedParent(ParentId: string) {
      this.ParentToEdit.next(ParentId);
    }
    
}
