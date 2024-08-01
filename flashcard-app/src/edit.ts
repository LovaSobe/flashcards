import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IquestionRow, IDeckRow, Colors, NewQuestion, updatedQuestion } from 'resources/types';
import { deleteQuestion, getAllFromDeck, getDeckInfo, insertQuestion, updateQuestion } from 'services/api-service';
import { Router } from 'aurelia-router';


@inject(HttpClient, Router)

export class quizeditor {

  newQuestion = {
    deck_id: '1',
    question: '', 
    answer: ''
  }

  updatedQuestion = {
    question: '', 
    answer: ''
  }

  public deckInfo: IDeckRow; 

  public deckID: number; 
  public questions: any; 
  public data: any; 
  public index: number = 0; 
  public alertError: boolean = false; 
  public errorMsg: string = ''; 
  public editQuestion: boolean = true; 
  public itemID: number | null = null; 
  public deckName: string; 


  activate(params) {
    this.deckID = params.id; 
  }

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  async attached() {
    await this.getQuestionsFromDeck(this.deckID); 
    await this.getInfoOfDeck(this.deckID);
    this.questions = this.data[this.index]; 
  }

  async getQuestionsFromDeck(deck_id: number): Promise<any> {
    try {
      const response = await this.httpClient.fetch('questions/' + deck_id, {
        method: 'GET'
      });

      if (response.ok) {
        console.log("INSIDE GET Q FROM DECKS");
        this.data = await response.json();
        console.log('Data received:', this.data);
      } else {
        console.error(`HTTP error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async getQuestions(): Promise<IquestionRow> {
    try {
      const response = await this.httpClient.fetch('questions', {
        method: 'GET'
      });

      if (response.ok) {
        this.data = await response.json();
        console.log('Data received:', this.data);
        return this.data; 
      } else {
        console.error(`HTTP error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async addQuestion(): Promise<void> {
    try {
      const result = await insertQuestion(this.newQuestion); 
      console.log('New question added: ', result); 
    } 
    catch(e){
      console.error("Error with fetch operation: ", e); 
      throw e; 
    }
  }

  async updateQuestion(id: number): Promise<void> {
    try {
      const result = await updateQuestion(this.updatedQuestion, id); 
      await this.getQuestions(); 
    } 
    catch(e){
      console.error("Error with fetch operation: ", e); 
      throw e; 
    }
  }

  //deleteQuestion fungerar ejj. 
  async deleteQuestion(id: number): Promise<void> {
    try {
      const result = await deleteQuestion(id); 
      this.getQuestions(); 
      console.log('Question deleted: ', result); 
    }
    catch (e){
      console.log('Error with fetch operation ', e); 
      throw e; 
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

  isTextEmpty() {
    if(this.newQuestion.question == '') return 'Fråga'; 
    if(this.newQuestion.answer == '') return 'Svar'; 
  }


  validateAddQuestion() {
    this.errorMsg = ''; 
    this.alertError = false; 

    if(!this.newQuestion.question){
      this.errorMsg = 'Fråga saknas!'
      this.alertError = true; 
    }
    else if(!this.newQuestion.answer){
      this.errorMsg = 'Svar saknas!'
      this.alertError = true; 
    }

    if(!this.alertError){
      this.addQuestion(); 
      this.getQuestions(); 
    }
  }

  clearFields(){
    this.newQuestion.question = ''; 
    this.newQuestion.answer = ''; 
  }

  GoBack(){
    this.router.navigateToRoute('quiz');
  }

  startEditing(id: number){
    this.itemID = id; 
  }

  stopEditing() {
    this.itemID = null;  
  }

  saveEdit(questionID: number){
    updateQuestion(this.updatedQuestion, questionID); 
    this.stopEditing(); 
    this.getQuestions(); 
  }

  clearEdit(){
    this.stopEditing(); 
  }
}
