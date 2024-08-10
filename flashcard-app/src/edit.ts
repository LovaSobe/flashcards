import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IquestionRow, IDeckRow, NewQuestion, headingFont } from 'resources/types';
import { deleteQuestion, getDeckInfo, insertQuestion, updateQuestion, removeDeck } from 'services/api-service';
import { Router } from 'aurelia-router';


@inject(HttpClient, Router)

export class quizeditor {

  updatedQuestion = {
    question: '', 
    answer: ''
  }
  
  public newQuestion: NewQuestion; 
  public deckInfo: IDeckRow; 
  public deckID: number; 
  public data: any; 
  public alertError: boolean = false; 
  public errorMsg: string = ''; 
  public editQuestion: boolean = true; 
  public itemID: number | null = null; 
  public deckName: string; 
  
  public mainFont: string; 
  public secondaryFont: string; 
  public blueBG: string; 
  public myMargins: string; 
  public mainButton: string; 
  public secondaryButton: string; 
  public darkButton: string; 
  public orangeSecondary: string; 
  public blueBorder: string; 


  activate(params) {
    this.deckID = params.id; 
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.mainFont = headingFont.headingOrange; 
    this.secondaryFont = headingFont.secondaryColor; 
    this.blueBG = headingFont.bgBlue; 
    this.mainButton = headingFont.buttonStyling; 
    this.secondaryButton = headingFont.secondaryButton; 
    this.darkButton = headingFont.strongBlueBtn;
    this.orangeSecondary = headingFont.orangeSecondary; 
    this.blueBorder = headingFont.blueBorder;
  }

  async attached() {
    await this.getInfoOfDeck(this.deckID);
    await this.getQuestionsFromDeck(this.deckID); 
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

  async addQuestion(): Promise<void> {
    try {
      this.newQuestion.deck_id = this.deckID; 
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
      this.getQuestionsFromDeck(this.deckID); 
    } 
    catch(e){
      console.error("Error with fetch operation: ", e); 
      throw e; 
    }
  }

  async deleteQuestion(id: number): Promise<void> {
    try {
      const result = await deleteQuestion(id); 
      this.getQuestionsFromDeck(this.deckID); 
      console.log('Question deleted: ', result); 
    }
    catch (e){
      console.log('Error with fetch operation ', e); 
      throw e; 
    }
  }

  async deleteDeck(deck_id: number): Promise<void> {
    try {
      const result = await removeDeck(deck_id); 
      this.getQuestionsFromDeck(this.deckID); 
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
      this.getQuestionsFromDeck(this.deckID); 
    }
  }

  clearFields(){
    this.newQuestion.question = ''; 
    this.newQuestion.answer = ''; 
  }

  GoBack(){
    this.router.navigateToRoute('quiz', {id: this.deckID});
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
    this.getQuestionsFromDeck(this.deckID); 
  }

  clearEdit(){
    this.stopEditing(); 
  }

  validateDeleteDeck(){
    //ARE YOU SURE
    this.deleteDeck(this.deckID); 
    this.router.navigateToRoute('home'); 
  }
}
