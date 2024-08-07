import { httpClient } from './http-client-config';
import { NewDeck, NewQuestion, updatedQuestion } from 'resources/types';

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

export async function insertDeck(newDeck: NewDeck): Promise<any>{
  try {
    const response = await httpClient.fetch('decks', {
      method: 'POST', 
      body: JSON.stringify(newDeck)
    }); 
    if(response.ok){
      const data = await response.json(); 
      return data; 
    }
    else {
      throw new Error('Network response was not ok'); 
    }
  }
  catch(e) {
    console.error('There was a problem with the fetch operation: ', e); 
    throw e; 
  }
}

export async function updateQuestion(updatedQuestion: updatedQuestion, id: number): Promise<any> {
  try {
    const response = await httpClient.fetch('questions/' + id, {
      method: 'PUT',
      body: JSON.stringify(updatedQuestion)
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
      body: JSON.stringify({ data: id }),
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

export async function removeDeck(deck_id: number): Promise<any> {
  try{
    const response = await httpClient.fetch('decks/' + deck_id, {
      method: 'DELETE',
      body: JSON.stringify({ data: deck_id })
    }); 
    if(response.ok) {
      const result = await response.json(); 
      return result; 
    }
  }
  catch(e){
    console.error('There was a problem with the fetch operation: ', e); 
    throw e; 
  }
}

export async function getAllFromDeck(deck_id: number): Promise<any> {
  try {
    const response = await httpClient.fetch('questions/' + deck_id, {
      method: 'GET'
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

export async function getDeckInfo(deck_id: number) {
  try{
    const response = await httpClient.fetch('decks/' + deck_id, {
      method: 'GET'
    }); 
    if(response.ok){
      const result = await response.json(); 
      return result; 
    }
    else {
      throw new Error('Network response was not ok') ;
    }
  }
  catch(e) {
    console.error('There was a problem with the fetch operation: ', e); 
    throw e; 
  }
}

export async function getAllDecks(){
  try {
    const response = await httpClient.fetch('decks/', {
      method: 'GET'
    }); 
    if(response.ok){
      const result = await response.json(); 
      return result; 
    }
    else {
      throw new Error('Network response not ok'); 
    }
  }
  catch(e) {
    console.error('There was a problem with the fetch operation ', e); 
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
