import {Aurelia} from 'aurelia-framework';
import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.css';
import { HttpClient } from 'aurelia-fetch-client';
import { httpClient } from 'services/http-client-config';

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

  aurelia.container.registerInstance(HttpClient, httpClient);
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
