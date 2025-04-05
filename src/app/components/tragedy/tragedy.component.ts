import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Tragedy } from '../../core/models/common-model';
import { TragedyService } from '../../core/services/tragedy.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { NavigationComponent } from '../../pages/navigation/navigation.component';

@Component({
  selector: 'app-tragedy',
  imports: [NgFor, AsyncPipe, RouterModule],
  templateUrl: './tragedy.component.html',
  styleUrl: './tragedy.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TragedyComponent {
  private readonly tragediesService = inject(TragedyService);
  private readonly route = inject(ActivatedRoute);

  id!: string | null;
  tragedies$: Observable<Tragedy[]> = this.tragediesService.tragedies$;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tragediesService.getTragedies(this.id);
  }
}
