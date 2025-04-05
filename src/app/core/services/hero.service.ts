import { inject, Injectable } from '@angular/core';
import { Hero, HeroForm } from '../models/common-model';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { EndPoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes$ = new BehaviorSubject<Hero[]>([]);
  heroes = this.heroes$.asObservable();

  private readonly apiService = inject(ApiService);

  getHeroes(id: string | null) {
    return this.apiService.get<Hero[]>(EndPoint.Heroes).subscribe({
      next: (res: Hero[]) => {
        this.setHeroes(res, id);
      },
      error: (err) => console.error('Error fetching heroes:', err),
    });
  }

  setHeroes(heroes: Hero[], id: string | null) {
    const filteredHeroesById = heroes.filter((hero) => hero.tragedy_id == id);
    this.heroes$.next(filteredHeroesById);
  }

  deleteHero(heroId: number) {
    this.apiService.delete(`${EndPoint.Heroes}/${heroId}`).subscribe({
      next: () => {
        const heroes = this.heroes$.getValue();
        this.heroes$.next(heroes.filter((hero) => +hero.id !== heroId));
      },
      error: (err) => console.error('Error deleting hero:', err),
    });
  }

  editHero(hero: Hero) {
    this.apiService.put<Hero>(`${EndPoint.Heroes}/${hero.id}`, hero).subscribe({
      next: (updatedHero) => {
        const heroes = this.heroes$.getValue();
        this.heroes$.next(
          heroes.map((h) => (h.id === updatedHero.id ? updatedHero : h))
        );
      },
      error: (err) => console.error('Error updating hero:', err),
    });
  }

  createHero(hero: HeroForm, tragedyId: string | null) {
    const newHero = {
      ...hero,
      tragedy_id: tragedyId,
      id: new Date().getTime().toString(),
    };

    this.apiService.post<Hero>(EndPoint.Heroes, newHero).subscribe({
      next: (createdHero) => {
        this.heroes$.next([...this.heroes$.getValue(), createdHero]);
      },
      error: (err) => console.error(`Error creating hero: `, err),
    });
  }
}
