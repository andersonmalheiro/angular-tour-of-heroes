import { Component, OnInit } from "@angular/core";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    console.log(this.heroes);
    this.getHeroes();
  }
}
