import { httpClient } from './http-client-config';

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
