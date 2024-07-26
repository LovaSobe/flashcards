// src/app.ts
import { Router, RouterConfiguration } from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  public questions: any; 
  public decks: any; 
  router: Router; 

  constructor() {
  }

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Flashcards'; 
    config.map([
      {route: '', name: 'quiz', moduleId: PLATFORM.moduleName('quizview'), title: 'Quiz'}, 
      {route: 'edit', name: 'edit', moduleId: PLATFORM.moduleName('edit'), title: 'Quiz editor'}, 
      {route: ':slug', name: 'notFound', moduleId: PLATFORM.moduleName('resources/notFound'), title: 'View Post'}, 
    ]); 
  }
}
