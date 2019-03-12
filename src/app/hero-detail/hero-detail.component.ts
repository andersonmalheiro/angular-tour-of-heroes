import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "../hero";

import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder } from "@angular/forms";
import { Validators } from '@angular/forms';

import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  edit: boolean = true;

  heroForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    role: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    description: [''],
    active: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getHero();
    this.heroForm.disable();
  }

  toggleEditMode(): void {
    this.edit = !this.edit;
    if(this.edit){
      this.heroForm.disable();
    } else {
      this.heroForm.enable();
    }
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(hero => (
      this.hero = hero, 
      this.heroForm.setValue({
      name: hero['name'],
      role: hero.role,
      description: hero.description,
      active: hero.active
    })));
  }

  deleteHero(id: string): void {
    console.log(id);
    this.heroService.deleteHero(id).subscribe(
      _ => this.router.navigate(['/heroes']),
    );
  }

  updateHero(id: string): void {
    this.heroService.updateHero(id, this.heroForm.value).subscribe(
      _ => this.toggleEditMode(),
      hero => this.hero = hero
    );
  }

  goBack(): void {
    this.location.back();
  }
}
