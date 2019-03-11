import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "../hero";

import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  edit: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.getHero();
  }

  toggleEditMode(): void {
    this.edit = !this.edit;
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }

  addHero(hero: Hero): void {
    this.heroService.addHero(hero).subscribe(
      _ => this.router.navigate([`/${hero._id}`])
    )
  }

  deleteHero(id: string): void {
    console.log(id);
    this.heroService.deleteHero(id).subscribe(
      _ => this.router.navigate(['/heroes']),
    );
  }

  updateHero(hero: Hero ): void {
    this.heroService.updateHero(hero).subscribe(
      _ => this.toggleEditMode(),
    );
  }

  goBack(): void {
    this.location.back();
  }
}
