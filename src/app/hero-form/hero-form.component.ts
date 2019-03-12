import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HeroService } from '../hero.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  heroForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    role: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    description: [''],
    active: ['', Validators.required]
  })

  constructor(
    private heroService: HeroService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  addHero(): void {
    console.log(this.heroForm.value);
    this.heroService.addHero(this.heroForm.value).subscribe(
      hero => this.router.navigate([`/detail/${hero._id}`])
    );
  }

  ngOnInit() {
  }

}
