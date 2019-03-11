import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  constructor( 
    private heroService: HeroService,
    private router: Router
  ) { }

  addHero(name: string): void {
    this.heroService.addHero(name).subscribe(
      hero => this.router.navigate([`/detail/${hero._id}`])
    );
  }

  ngOnInit() {
  }

}
