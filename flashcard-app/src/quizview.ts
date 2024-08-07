import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IquestionRow, Colors } from 'resources/types';
import { Router } from 'aurelia-router';


@inject(HttpClient, Router)

export class quizview {
  public questions: any; 
  public data: any; 
  public index: number = 0; 
  public turn = false; 
  public deckID: number; 

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  activate(params) {
    this.deckID = params.id; 
  }


  async attached() {
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
