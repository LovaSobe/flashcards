import { HttpClient } from "aurelia-fetch-client";
import { inject } from 'aurelia-framework'; 
import { getAllDecks, getAllFromDeck, insertDeck } from "services/api-service";
import { Router } from "aurelia-router";
import { NewDeck, headingFont } from "resources/types";

@inject(HttpClient, Router)

export class home {

  public heading: string; 
  public decks: any; 
  public questionsFromDeck: any; 
  public antal: number; 
  public errorMsg: string; 
  public alertError: boolean = false;  
  public newDeck: NewDeck; 

  constructor(private httpClient: HttpClient, private router: Router){
    this.heading = headingFont.headingOrange; 
  }

  async attached(){
    await this.getDecks(); 
  }

  async getDecks(){
    try {
      this.decks = await getAllDecks(); 
    }
    catch(e) {
      console.error('Error with fetch operation: ' + e); 
      throw e; 
    }
  }

  async getNumberOfQuestions(deck_id: number){ 
    try {
      this.questionsFromDeck = await getAllFromDeck(deck_id); 
      this.antal = Object.keys(this.questionsFromDeck).length; 
    }
    catch(e) {
      console.error('Error with fetch operation: ' + e); 
      throw e; 
    }
  }

  validateAddDeck() {
    this.errorMsg = ''; 
    this.alertError = false; 
    console.log('i validate');

    if(!this.newDeck.name){
      console.log('här är det tokigt!! ');
      this.errorMsg = 'Fråga saknas!'; 
      this.alertError = true; 
    }

    if(!this.alertError) {
      console.log('inga tokigheter!! ');
      const res = insertDeck(this.newDeck); 
      console.log('RESULT From INSERT' + res);
      //this.router.navigateToRoute('edit', {id: newDeck.id});
    }
  }
  
  goToRedigera(deck_id: number) {
    this.router.navigateToRoute('edit', {id: deck_id});
  }

  playGame(deck_id: number){
    this.router.navigateToRoute('quiz', {id: deck_id})
  }

}


/* 
- Det går att klicka på redigera
- Det går att klicka på hem
- Om användaren skriver in namn går det att skapa ett nytt deck
- började exprimentera med färger
- försökte se hur många objekt som finns i min JSON men ICKE 

BEHÖVER GÖRAS: 
- ta id från nyskapade deck och gå till redigera
- validate fungerar inte ??? 
- endast höger sida ska skrolla
- antal frågor i varje deck 

*/ 
