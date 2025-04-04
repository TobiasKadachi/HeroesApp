import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor(
    private HeroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){  }
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.HeroesService.getHeroById( id )),
    )
    .subscribe( Hero =>{

      if(!Hero) return this.router.navigate(['/heroes/list']);

      this.hero = Hero;
      console.log({Hero})
      return;
    } )
  }

  goBack(): void{
    this.router.navigateByUrl('heroes/list')
  }


}
