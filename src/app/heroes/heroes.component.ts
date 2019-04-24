import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeros();
  }

  getHeros(): void {
    this.heroService.getHeroes()
                    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string) {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addHero({name} as Hero)
                    .subscribe(hero => {
                      this.heroes.push(hero);
                    });
  }

  remove(id: number) {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    this.heroService.removeHero(id).subscribe();
  }
}
