import {Aurelia} from 'aurelia-framework';
import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.css';
import { HttpClient } from 'aurelia-fetch-client';

if ((module as any).hot) {
  (module as any).hot.accept();
  (module as any).hot.dispose(() => {
    const aurelia = (window as any).aurelia;
    aurelia.container.get('EventAggregator').publish('hot-reload');
    aurelia.setRoot(PLATFORM.moduleName('app')).then(() => console.log('Aurelia hot-reloaded'));
  });
}

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

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

aurelia.container.registerInstance(HttpClient, httpClient);
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
