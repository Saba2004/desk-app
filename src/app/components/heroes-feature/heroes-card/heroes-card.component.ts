import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  MatCardHeader,
  MatCard,
  MatCardContent,
  MatCardActions,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { Hero } from '../../../core/models/common-model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-heroes-card',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatButton,
  ],
  templateUrl: './heroes-card.component.html',
  styleUrl: './heroes-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesCardComponent {
  @Input() hero!: Hero;

  @Output() deleteHero = new EventEmitter<number>();
  @Output() editHero = new EventEmitter<Hero>();

  onDeleteHero(heroId: number) {
    this.deleteHero.emit(heroId);
  }

  onEditHero(hero: Hero) {
    this.editHero.emit(hero);
  }
}
