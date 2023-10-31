import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShareDataService {
  private selectedValueSubject = new BehaviorSubject<any>(null);
  selectedValue$ = this.selectedValueSubject.asObservable();

  setSelectedValue(value: any) {
    this.selectedValueSubject.next(value);
  }
}
