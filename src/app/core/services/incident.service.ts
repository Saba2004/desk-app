import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Incident } from '../models/common-model';
import { ApiService } from './api.service';
import { EndPoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private incidentsSubject$ = new BehaviorSubject<Incident[]>([]);
  users$ = this.incidentsSubject$.asObservable();

  private readonly apiService = inject(ApiService);

  getIncidents() {
    return this.apiService
      .get<Incident[]>(EndPoint.Incidents)
      .subscribe((res) => this.setIncident(res));
  }

  setIncident(incidents: Incident[]) {
    this.incidentsSubject$.next(incidents);
  }
}
