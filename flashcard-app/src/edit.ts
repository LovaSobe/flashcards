import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IquestionRow, Colors, NewQuestion } from 'resources/types';
import { deleteQuestion, insertQuestion } from 'services/api-service';
import { Router } from 'aurelia-router';


@inject(HttpClient, Router)

export class quizeditor {

  newQuestion = {
    deck_id: '1',
    question: '', 
    answer: ''
  }

  public questions: any; 
  public data: any; 
  public index: number = 0; 
  public alertError: boolean = false; 
  public errorMsg: string = ''; 

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  async attached() {
    await this.getQuestions(); 
    this.questions = this.data[this.index]; 
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
}
