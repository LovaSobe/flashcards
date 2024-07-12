// src/app.ts
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class App {
  constructor(private httpClient: HttpClient) {}

  attached(): void {
    this.testHttpClient();
  }

  async testHttpClient(): Promise<void> {
    try {
      const response = await this.httpClient.fetch('questions', {
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
