import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { IncidentService } from '../../core/services/incident.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../pages/navigation/navigation.component';

@Component({
  selector: 'app-incidents',
  imports: [AsyncPipe, NgFor, RouterModule],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentsComponent implements OnInit {
  private readonly incidentService = inject(IncidentService);
  readonly incidents$ = this.incidentService.users$;
  ngOnInit(): void {
    this.incidentService.getIncidents();
  }
}
