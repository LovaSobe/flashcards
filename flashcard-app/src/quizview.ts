import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IquestionRow, Colors, IDeckRow, headingFont } from 'resources/types';
import { Router } from 'aurelia-router';
import { getDeckInfo } from 'services/api-service';


@inject(HttpClient, Router)

export class quizview {
  public questions: any; 
  public deckInfo: IDeckRow; 
  public data: any; 
  public index: number = 0; 
  public turn = false; 
  public deckID: number; 
  public mainFont: string; 
  public secondaryFont: string; 
  public mainBtn: string; 
  public secondaryBtn: string; 
  public secondaryBg: string; 
  public mainBg: string; 
  public myMargin: string; 

  constructor(private httpClient: HttpClient, private router: Router) {
    this.mainFont = headingFont.headingOrange; 
    this.secondaryFont = headingFont.secondaryColor; 
    this.mainBtn = headingFont.strongBlueBtn; 
    this.secondaryBtn = headingFont.secondaryButton; 
    this.secondaryBg = headingFont.bgBlue; 
    this.mainBg = headingFont.bgOrange; 
    this.myMargin = headingFont.bigMargins;
  }

  activate(params) {
    this.deckID = params.id; 
  }


  async attached() {
    await this.getInfoOfDeck(this.deckID);
    await this.getQuestionsFromDeck(this.deckID); 
    this.questions = this.data[this.index]; 
  }

  async getQuestionsFromDeck(deck_id: number): Promise<any> {
    try {
      const response = await this.httpClient.fetch('questions/' + deck_id, {
        method: 'GET'
      });

      if (response.ok) {
        this.data = await response.json();
        console.log('Data received:', this.data);
      } else {
        console.error(`HTTP error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async getInfoOfDeck(deck_id: number){
    try {
     this.deckInfo = await getDeckInfo(deck_id); 
    }
    catch (e) {
     console.log('Error with fetch operation ', e); 
     throw e; 
    } 
   }

  next() {
    this.index = (this.index + 1) % this.data.length; 
    this.questions = this.data[this.index]; 
    this.turn = false; 
  }

  startOver() {
    this.index = 0; 
    this.questions = this.data[0]; 
    this.turn = false; 
  }

  removeFromDeck() {
   this.data.splice(this.index, 1); 
   if(this.data.length != 0){
    this.next();
   }
   else {
    this.outOfQuestions(); 
   }
  }

  outOfQuestions(){
    //todo
  }

  redigeraQuiz(){
    //todo
  }

  shuffleDeck(){
    console.log(this.data); 
    this.data.sort((a,b) => {
      return Math.random() - 0.5; 
    })
    this.startOver(); 
    console.log(this.data); 
  }

  async restart(){
    await this.getQuestionsFromDeck(this.deckID);    
    this.startOver(); 
  }

    goToRedigera(deck_id: number) {
      this.router.navigateToRoute('edit', {id: deck_id});
    }

}
