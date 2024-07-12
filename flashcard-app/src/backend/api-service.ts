import {HttpClient, json} from 'aurelia-fetch-client';
  
let httpClient = new HttpClient();

httpClient.configure(config => {
  config
    .useStandardConfiguration()
    .withBaseUrl('http://localhost:8080/api/')
    .withDefaults({
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      }
    })
    .withInterceptor({
      request(request) {
        console.log('Requesting ${request.method} ${request.url}')
        return request;
      },
      response(response) {
        console.log(`Received ${response.status} ${response.url}`);
        return response; 
      }
    });
});



httpClient
  .fetch('questions', {
    method: 'get',
    body: JSON.stringify({ key: 'value' })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    alert('Error saving comment!');
  });
