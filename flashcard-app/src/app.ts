// src/app.ts
import { Router, RouterConfiguration } from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { headingFont } from 'resources/types';

export class App {
  public questions: any; 
  public decks: any; 
  public heading: string; 
  public links: string; 
  public bgColor: string; 
  public marginNav: string; 
  router: Router; 

  constructor() {
    this.heading = headingFont.headingOrange; 
    this.links = headingFont.headingLink; 
    this.bgColor = headingFont.bgBlue;
    this.marginNav = headingFont.marginNavigation; 
  }

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Flashcards'; 
    config.map([
      {route: '', name: 'home', moduleId: PLATFORM.moduleName('home'), title: 'Hem'}, 
      {route: 'quiz/:id', name: 'quiz', moduleId: PLATFORM.moduleName('quizview'), title: 'Quiz'}, 
      {route: 'edit/:id', name: 'edit', moduleId: PLATFORM.moduleName('edit'), title: 'Quiz editor'}, 
      {route: 'library', name: 'library', moduleId: PLATFORM.moduleName('library'), title: 'Mina Quiz'}, 
      {route: ':slug', name: 'notFound', moduleId: PLATFORM.moduleName('resources/notFound'), title: 'View Post'}, 
    ]); 
  }
}
