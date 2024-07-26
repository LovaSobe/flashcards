import { httpClient } from './http-client-config';
import { NewQuestion } from 'resources/types';

export async function insertQuestion(newQuestion: NewQuestion): Promise<any> {
  try {
    const response = await httpClient.fetch('/questions', {
      method: 'POST',
      body: JSON.stringify(newQuestion)
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export async function deleteQuestion(id: number): Promise<any> {
  try {
    const response = await httpClient.fetch('questions/' + id, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}




//TODO - BROKEN 
/* 
export class ApiService {

    constructor() {}

    public async fetchQuestions(): Promise<any> {
      try {
        const response = await httpClient.fetch('questions', {
          method: 'GET'
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Data received:', data);
        } else {
          console.error(`HTTP error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    public async fetchDecks(): Promise<void> {
      try {
        const response = await httpClient.fetch('decks', {
          method: 'GET'
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Data received:', data);
        } else {
          console.error(`HTTP error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
}
*/ 
