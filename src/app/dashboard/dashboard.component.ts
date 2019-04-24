import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topHeroes: Hero[] = [];

  constructor(private heroesService: HeroService) { }

  ngOnInit() {
    this.getTopHeroes();
  }

  getTopHeroes() {
    this.heroesService.getHeroes()
                      .subscribe(heroes => this.topHeroes = heroes.slice(0, 4));
  }

}
