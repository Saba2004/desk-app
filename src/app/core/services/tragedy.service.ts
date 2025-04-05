import { inject, Injectable } from '@angular/core';
import { Tragedy } from '../models/common-model';
import { BehaviorSubject } from 'rxjs';
import { EndPoint } from '../constants/constants';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TragedyService {
  private tragedyesSubject$ = new BehaviorSubject<Tragedy[]>([]);
  tragedies$ = this.tragedyesSubject$.asObservable();

  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  id: string | null = this.route.snapshot.paramMap.get('id');

  getTragedies(id: string | null) {
    return this.apiService
      .get<Tragedy[]>(EndPoint.Tragedies)
      .subscribe((res: Tragedy[]) => {
        this.setTragedies(res, id);
      });
  }

  setTragedies(tragedies: Tragedy[], id: string | null) {
    const filteredTragediesById = tragedies.filter(
      (tragedy) => tragedy.incident_id == id
    );
    this.tragedyesSubject$.next(filteredTragediesById);
  }
}
