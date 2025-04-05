import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { HeroService } from '../../../core/services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero, HeroForm } from '../../../core/models/common-model';
import { AsyncPipe } from '@angular/common';
import { HeroesCardComponent } from '../heroes-card/heroes-card.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { EditCreateDialogComponent } from '../edit-create-dialog/edit-create-dialog.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-heroes-list',
  imports: [AsyncPipe, HeroesCardComponent, MatButton],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesListComponent implements OnInit {
  private readonly heroService = inject(HeroService);
  private readonly route = inject(ActivatedRoute);
  private readonly tragedyId = this.route.snapshot.paramMap.get('id');

  heroes: Observable<Hero[]> = this.heroService.heroes;
  public dialog = inject(MatDialog);

  id!: string | null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroes(this.id);
  }

  onDeleteHero(heroId: number) {
    this.dialog
      .open(DeleteConfirmDialogComponent, {
        data: {
          id: heroId,
        },
      })
      .afterClosed()
      .subscribe((res: Boolean) => {
        if (res) {
          this.heroService.deleteHero(heroId);
        }
      });
  }

  openCreateEditDialog(hero?: Hero) {
    this.dialog
      .open(EditCreateDialogComponent, {
        data: {
          isEdit: !!hero,
          hero,
        },
      })
      .afterClosed()
      .subscribe((res: HeroForm) => {
        if (res) {
          if (hero) {
            const heroId = hero.id;
            const tragedyId = hero.tragedy_id;
            this.heroService.editHero({
              ...res,
              id: heroId,
              tragedy_id: tragedyId,
            });
          } else {
            const newHero = {
              ...res,
              id: new Date().getTime().toString(),
              tragedy_id: this.id,
            };
            this.heroService.createHero(newHero, this.tragedyId);
          }
        }
      });
  }
}
